import React, { Component } from "react";
import * as Roles from "../../Roles";
// import { Redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom";

import "./Storehouse.css";
import { DataContext } from "../../api/products";
import Modal from "./modal/ModalNewP";
import ModalDelete from "./modal/ModalDelP";
import ModalEdit from "./modal/ModalEditP";
import ModalCat from "./modal/ModalNewCat";

const ROLE = window.localStorage.getItem("ROLE");

export default class Storehouse extends Component {
  state = {
    openModal: false,
    openModal2: false,
    openModal3: false,
    openModal4:false,
  };
  componentDidMount() {
    // if (ROLE === Roles.CASHIER) {
    //     console.log("Entro porque ", ROLE, Roles.CASHIER)
    //   this.props.history.push("/cashier");
    // }
    ROLE === Roles.CASHIER && this.props.history.push("/cashier");
  }
  

  static contextType = DataContext;
  render() {

    const handleOpenModal = () => {
      this.setState({ openModal: true });
    };
    
    const handleOpenModal2 = () => {
      this.setState({ openModal2: true });
    };
    const handleOpenModal3 = () => {
      this.setState({ openModal3: true });
    };
    const handleOpenModal4 = () => {
      this.setState({ openModal4: true });
    }
    const { products } = this.context;
    return (
      <div className="back">
        <h1>Almacen</h1>
        <div className="row">
          <div className="column1">
            <div className="container_bnt">
              <h2 className="info">Acciones</h2>
              <p className="info">
                Aquí se listan las acciones que se pueden realizar.
              </p>
              <div className="container">
                <button className="btn btn1" onClick={() => handleOpenModal()}>
                  Nuevo Producto
                </button>
                <button className="btn btn1" onClick={() => handleOpenModal3()}>
                  Editar Producto
                </button>
                <button className="btn btn1" onClick={() => handleOpenModal2()}>
                  Eliminar Producto
                </button>
                <button className="btn btn1" onClick={() => handleOpenModal4()}>
                  Agregar Categorias
                </button>
                {/* <button className="btn btn1">Extra</button> */}
              </div>
            </div>
          </div>
          <div className="column2">
            <div className="container_bnt">
              <h2 className="info">Mis productos</h2>
              <p className="info">
                Listado Completo de productos existentes en la base de datos.
              </p>
              {/* Map products with name, id, cuantity price */}
              <div style={{ paddingBottom: "0.1px" }}>
                <div className="table-wrapper" style={{ overflow: "auto" }}>
                  <table className="fl-table sortable" id="usersTable">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Identificador(id)</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item) => (
                        <tr className="item">
                          <td>{item.proname}</td>
                          <td>{item.productid}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          <td>{item.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <p>-</p>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
        >
          Lorem
        </Modal>
        <ModalDelete
          isOpen={this.state.openModal2}
          onClose={() => this.setState({ openModal2: false })}
        >
          Lorem
        </ModalDelete>
        <ModalEdit
          isOpen={this.state.openModal3}
          onClose={() => this.setState({ openModal3: false })}
        >
          Lorem
        </ModalEdit>
        <ModalCat 
        isOpen={this.state.openModal4}
        onClose={()=> this.setState({openModal4:false})}
        >
          
          </ModalCat>
      </div>
    );
  }
}
