import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { DataContext } from '../../../api/products';


export default function ModalEdit(props) {

    const context = useContext(DataContext)
    const [productId, setproductId] = useState("");
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    const handleClickModal = () => {
        EditCart()
    }
    const EditCart = () => {

        if(price !== null){
            context?.editProductprice(window.localStorage.USER_KEY,productId, price);
        }
        if(quantity !== null){
            context?.editProductquantity(window.localStorage.USER_KEY,productId,quantity );
        }
        
        props.onClose();
    };

    if (!props.isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="Modal">
            <div className="Modal__container">
                <button className="Modal__close-button" onClick={props.onClose}>
                    x
                </button>
                <div>
                    <div>
                        <h1>Editar un producto</h1>
                        <label>ingrese el id* del producto a editar:</label>
                        <input className="" type="text" onChange={(e) => {setproductId(e.target.value);}} required/>
                        <label>Ingrese el nuevo precio:</label>
                        <input className="" type="number" onChange={(e) => {setPrice(e.target.value);}} />
                        <label>Ingresa la cantidad nueva del producto:</label>
                        <input className="" type="number" onChange={(e) => {setQuantity(e.target.value);}} />
                    </div>
                    <button className="btn--cart" onClick={() => handleClickModal()}>
                            Editar Producto
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modaledit")
    );
}