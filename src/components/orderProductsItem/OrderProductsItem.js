import React, {useContext} from 'react'
import './OrderProductsItem.css'
import { DataContext } from '../../api/products'

const OrderProductsItem = (props) => {
    const context = useContext(DataContext)

    return (
        <div>
            <div className="bag-product">
                <div className="description">
                    <h2>{props.producto.description}</h2>
                    <p style={{ marginBottom: '0.5rem' }}>Identificador: {props.producto.productId}</p>
                    <h3>${props.producto.price} COP</h3>
                    <div className="quantity-wrapper">
                        <div className='amount' style={{display:'flex', flexDirection:'row'}}>
                            <label className='label' htmlFor="quantity" style={{ marginRight: '0.5rem' }}>Cantidad:</label>
                            <button className="count1" onClick={() => context?.reduction(props.producto.productId)}> - </button>
                            <span> {props.producto.quantity} </span>
                            <button className="count1" onClick={() => context?.increase(props.producto.productId)}> + </button>
                        </div>
                        <button className="btn-remove" onClick={()=>context?.removeProduct(props.producto.productId)}>Quitar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderProductsItem
