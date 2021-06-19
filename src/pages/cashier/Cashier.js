import React, { useContext, useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { STOREHOUSE } from "../../Roles";
import { useHistory } from "react-router-dom";

import "./Cashier.css";
import { DataContext } from "../../api/products";
import Category from "../../components/categorycard/Category";
import OrderProductsItem from "../../components/orderProductsItem/OrderProductsItem";
import axios from "axios";
import ModalNewUser from "./modal/ModalNewUser";
import Recurso1 from "../../Recursos/Recurso 1.png";
import Recurso2 from "../../Recursos/Recurso 2.png";

const ROLE = window.localStorage.getItem("ROLE");

const Cashier = () => {
  const context = useContext(DataContext);
  const products = context?.products;
  const cart = context?.cart;
  const total = context?.total;

  const [paytype, SetPaytype] = useState();
  const [cartElements, setCartElements] = useState([]);
  const [paytypeStr, SetPaytypeStr] = useState("");
  const [customerid, SetCustomerid] = useState("");
  const [customerCC, SetCustomerCC] = useState("");
  const [category, SetCategory] = useState();
  const [customer, SetCustomer] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    ROLE === STOREHOUSE && history.push("/storehouse");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCartElements(cart);
  }, [cart]);

  const uniqueItems = [...new Set(products.map((x) => x.category))];
  const data = [];
  uniqueItems.forEach((unique) => {
    data.push(products.filter((product) => product.category === unique));
  });
  // console.log(data);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const HandleCustomer = (customerCC) => {
    console.log(customerCC);
    axios({
      method: "POST",
      url: `https://marthacoffee.herokuapp.com/api/casher/loginCustomer`,
      headers: { Authorization: `${window.localStorage.getItem("USER_KEY")}` },
      data: { cedula: `${customerCC}` },
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Usuario Encontrado");
          SetCustomerid(res.data.Customer.customer);
          SetCustomer(res.data.Customer.name);

          document.getElementById("cc_cliente").value = "";
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          "algo ha sucedido,No se encontro el id o el usuario no esta registrado"
        );
      });
  };
  const HandlePaytype = (props) => {
    if (props === 1) {
      SetPaytype(1);
      SetPaytypeStr("Efectivo");
    }
    if (props === 2) {
      SetPaytype(2);
      SetPaytypeStr("Nequi");
    }

    if (props === 3) {
      SetPaytype(3);
      SetPaytypeStr("Bancolombia");
    }
  };

  const handleAddOrder = () => {
    context?.addOrder(
      customerid,
      window.localStorage.getItem("USER_KEY"),
      paytype
    );
    SetCustomer("");
    SetPaytypeStr("");
  };

  //Manejo de las categorias

  const HandleSetCategory = (props) => {
    SetCategory(props);
    console.log("se seteo la categoria:", category);
  };

  const HandleCategory = () => {
    console.log("entro a HandleCategory", category);
    if (category === undefined) {
      // console.log("categoria por default");
      return products.map((item) => <Card producto={item}></Card>);
    } else {
      // console.log("categoria:", uniqueItems[category]);
      return data[category].map((item) => <Card producto={item}></Card>);
    }
  };

  return (
    <div className="row">
      <div className="interface">
        <div className="column2">
          <div className="container_bnt"></div>
          <div className="leftspace">
            <h2>
              Menú
              <span>|Categorías</span>
            </h2>
            <div className="order">
              <Category
                producto={"Todos los productos"}
                onSet={() => HandleSetCategory()}
              ></Category>
              {uniqueItems.map((item) => (
                // setCat={()=> SetCategory(uniqueItems.indexOf(item))}
                <Category
                  producto={item}
                  onSet={() => HandleSetCategory(uniqueItems.indexOf(item))}
                ></Category>
              ))}
            </div>
            <h2>Realiza tu Pedido</h2>
            <div className="cardscontainer">{HandleCategory()}</div>
          </div>
        </div>
        <div className="column1">
          <div className="container_bnt">
            <div className="menubar">
              <h3>Orden</h3>
              <div id="menubarbutton">
                <button id="delete" onClick={() => context?.removeTotal()}>
                  Borrar todo
                </button>
              </div>
              <div className="center-wrapper">
                <div className="content">
                  {cartElements.map((item) => (
                    <>
                      <OrderProductsItem producto={item} />
                      <div class="line"></div>
                    </>
                  ))}
                  <div className="bag-total">
                    <div
                      className="total"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <h3>Total: </h3>
                      <h3> ${total} COP</h3>
                    </div>
                    <div className="customer1">
                      <h3 style={{ marginTop: "10px" }}>
                        Referencia a la factura: {customer}
                      </h3>
                      <input
                        id="cc_cliente"
                        type="text"
                        placeholder="Ingresa la cedula del cliente"
                        onChange={(e) => SetCustomerCC(e.target.value)}
                      />
                      <button
                        className="apply"
                        onClick={() => HandleCustomer(customerCC)}
                      >
                        Buscar
                      </button>
                      <div id="newusercontainer">
                        <button
                          className="apply"
                          id="newuser"
                          onClick={() => handleOpenModal()}
                        >
                          Agregar Nuevo Cliente
                        </button>
                      </div>
                    </div>
                    <h3 id="paytypeheader">Tipo de pago: {paytypeStr} </h3>
                    <div id="paytypeicons">
                      <div className="payicon">
                        <img src={Recurso1} alt="Nequi" />
                      </div>
                      <div className="payicon">
                        <img src={Recurso1} alt="Efectivo" />
                      </div>
                      <div className="payicon">
                        {" "}
                        <img src={Recurso2} alt="Banco" />
                      </div>
                    </div>
                    <div className="paytype_container">
                      <button
                        className="paytype_button"
                        onClick={() => HandlePaytype(2)}
                      >
                        Nequi
                      </button>
                      <button
                        className="paytype_button"
                        onClick={() => HandlePaytype(1)}
                      >
                        Efectivo
                      </button>
                      <button
                        className="paytype_button"
                        onClick={() => HandlePaytype(3)}
                      >
                        Bancolombia
                      </button>
                    </div>
                    <button
                      className="btn-go-checkout"
                      onClick={() => handleAddOrder()}
                    >
                      Realizar pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalNewUser isOpen={openModal} onClose={() => setOpenModal(false)}>
          Lorem
        </ModalNewUser>
      </div>
    </div>
  );
};

export default Cashier;
