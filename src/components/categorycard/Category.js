import React from 'react'
import "../categorycard/Category.css"

const Category = (props) => {

    return (
          <button onClick ={props.onSet}  className="button">{props.producto}</button>
          
    )
}

export default Category
