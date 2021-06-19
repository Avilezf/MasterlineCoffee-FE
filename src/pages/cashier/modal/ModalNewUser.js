import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { DataContext } from '../../../api/products';


export default function ModalNewUser(props) {

    const context = useContext(DataContext);

    const [cedula, setCedula] = useState();
    const [firstname, setfirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    

    const handleClickModal = () => {
        AddNewUser()
    }
    const AddNewUser = () => {
        context?.NewUser(window.localStorage.USER_KEY,cedula,firstname,lastname,email );
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
                        <h1>Agregar un Nuevo Cliente</h1>
                        <label>ingrese el nombre del cliente:</label>
                        <input className="" type="text" onChange={(e) => {setfirstname(e.target.value);}} required />
                        <label>ingrese el apellidos del cliente:</label>
                        <input className="" type="text" onChange={(e) => {setLastname(e.target.value);}} required/>
                        <label>ingrese la cedula del cliente:</label>
                        <input className="" type="text" onChange={(e) => {setCedula(e.target.value);}} required/>
                        <label>ingrese el email del cliente:</label>
                        <input className="" type="text" onChange={(e) => {setEmail(e.target.value);}} required/>
                       
                    </div>
                    <button className="btn--cart" onClick={() => handleClickModal()}>
                            Registrar Cliente
                        </button>
                </div>
            </div>
        </div>,
        document.getElementById("modalnewuser")
    );
}