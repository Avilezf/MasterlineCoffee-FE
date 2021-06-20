import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { DataContext } from '../../../api/products';


export default function ModalCat(props) {

    const context = useContext(DataContext)
    const [category, setCategory] = useState();

    const addCat = () => {

        context?.addCategories(window.localStorage.USER_KEY,category);
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
                        <h1>Agregar nueva categoria</h1><br/>
                        <label>Ingrese la nueva categoria:</label>
                        <input className="" type="string" onChange={(e) => {setCategory(e.target.value);}}/>
                    </div>
                    <button className="btn--cart" onClick={() => addCat()}>
                            Agregar Categoria
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modaledit")
    );
}