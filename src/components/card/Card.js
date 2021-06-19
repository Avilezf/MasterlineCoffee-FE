import React, { useContext } from 'react'
import "./Card.css"
import { DataContext } from '../../api/products'


const Card = (props) => {
    const context = useContext(DataContext)

    return (

        <div className="shape">
            <div className='cardbutton' onClick={()=> context?.addCart(props.producto.productid)} >
                <div className="content">
                    <img src={props.producto.image} alt={props.producto.proname} />
                </div>
                <div className="content">
                    <h4>{props.producto.proname}</h4>
                </div>
                <div className="content"><p>${props.producto.price} COP</p></div>
            </div>
        </div>


    )

}

export default Card