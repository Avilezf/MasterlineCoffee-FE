import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { DataContext } from '../../../api/products';


export default function ModalDelete(props) {

    const context = useContext(DataContext);
    const [proname, setProname] = useState("");
    const [productId, setproductId] = useState("");

    const handleClickModal = () => {
        deleteToCart()
    }
    const deleteToCart = () => {
        console.log(proname)
        context?.deleteProduct(window.localStorage.USER_KEY,productId );
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
                <div >
                    <div>
                        <h1>Eliminar un producto</h1>
                        <label>ingrese nombre del producto a eliminar:</label>
                        <input className="" type="text" onChange={(e) => {setProname(e.target.value);}} />
                        <label>ingrese el id* del producto a eliminar:</label>
                        <input className="" type="text" onChange={(e) => {setproductId(e.target.value);}} required/>
                       
                    </div>
                    <button className="btn--cart" onClick={() => handleClickModal()}>
                            Eliminar Producto
                        </button>
                </div>
            </div>
        </div>,
        document.getElementById("modaldelete")
    );
}