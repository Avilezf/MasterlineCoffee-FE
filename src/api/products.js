import axios from "axios";
import React, { Component } from 'react'


export const DataContext = React.createContext();

export default class DataProviderProducts extends Component {

    state = {
        products: [],
        cart: [],
        total: 0
    };

    // tools for casher
    removeProduct = id => {
        if (window.confirm("Estas Totalmente seguro que deseas elimiar el producto?")) {
            const { cart } = this.state;
            cart.forEach((item, index) => {
                if (item.productId === id) {
                    cart.splice(index, 1)
                }
            })
            this.setState({ cart: cart });
            this.getTotal();
        }

    };

    removeTotal = () => {
        while (this.state.cart.length !== 0) {
            const { cart } = this.state;
            cart.forEach((index) => {
                cart.splice(index, 1)
            })
            this.setState({ cart: cart });
            this.getTotal();
        }
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity);
        },0)
        this.setState({total: res})
    };

    addCart = (id) => {    
        const {products, cart} = this.state;
        // cambiar esto 
        const check = cart.every(item =>{
            return item.productId !== id
        })
        // check true primera insersion de producto / false producto existente 
        if(check){
            const data = products.filter(product =>{
                return product.productid === id
            })
            console.log(data[0].proname)
            const AddData = {
                'productId': data[0].productid,
                'description':  data[0].proname,
                'quantity': 1,
                'tax': 0 ,
                'price': data[0].price
            }
            //set state cart
            cart.push({...AddData})
            this.setState({ cart: cart });
            this.getTotal();
            console.log('Nuevo')
        }else{
            console.log('existente')
            const data = products.filter(product =>{
                return product.productid === id
            })
            console.log('data existente', data)
            this.increase(data[0].productid)
        }
        console.log('id a agregar: ', id, check , cart)
    };

    reduction = id =>{
        console.log('se reducio' , id)
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.productId === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.productId === id){
                item.quantity += 1;
            }
        })
        console.log('se aumento' , id)
        this.setState({cart: cart});
        this.getTotal();
    };
    //final push to the order
    addOrder = (customerid,token,paytype) => {
        console.log('entro')
        const{cart, total} = this.state;
        const DATA = {
            customerid,
            cart,
            paytype,
            total
        }
        axios({
            method: "POST",
            url: `https://marthacoffee.herokuapp.com/api/casher/addOrders`,
            headers: { "Authorization": `${token}`, 'Access-Control-Allow-Origin': '*' },
            data: DATA,
        })
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    alert('orden recibida exitosamente',res.resp)
                    this.removeTotal()
                }
            })
            .catch((err) => {
                console.log(err);
                alert('algo ha sucedido, no se puede realizar la orden',err)
            });
    }

    // tools for storehouse
    addProduct = (token,proname,price,quantity,category,image) => {
        console.log('entro')
        const DATA = {proname,price,quantity,category,image};
        axios({
            method: "POST",
            url: `https://marthacoffee.herokuapp.com/api/worker/addProduct`,
            headers: { "Authorization": `${token}` },
            data: DATA,
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert('producto agregado exitosamente')
                }
            })
            .catch((err) => {
                console.log(err);
                alert('algo ha sucedido, no se puedo agregar el producto')
            });
    }

    addCategories = (token,category) => {
        console.log('entro')
        const DATA = {category};
        axios({
            method: "POST",
            url: `https://marthacoffee.herokuapp.com/api/product/addCategory`,
            headers: { "Authorization": `${token}` },
            data: DATA,
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert('Categoria agregado exitosamente')
                }
            })
            .catch((err) => {
                console.log(err);
                alert('algo ha sucedido, no se pudo agregar la Categoria')
            });
    }

    deleteProduct = (token, productId) => {
        axios({
            method: "DELETE",
            url: `https://marthacoffee.herokuapp.com/api/worker/deleteProduct`,
            headers: { "Authorization": `${token}`, productid: `${productId}` },
        })
            .then((res) => {
                console.log(res) ;
                if (res.status === 200) {
                    alert('producto eliminado exitosamente')
                }
            })
            .catch((err) => {
                console.log(err);
                alert('algo ha sucedido, no se puedo eliminar el producto')
            });
    }

    editProductprice = (token, productId ,price) => {
        axios({
            method: "PUT",
            url: `https://marthacoffee.herokuapp.com/api/worker/editPrice`,
            headers: { "Authorization": `${token}`},
            data: {productid: `${productId}`, price: `${price}`  }
        })
            .then((res) => {
                console.log(res) ;
                if (res.status === 200) {
                    alert('producto editado exitosamente')
                }
            })
            .catch((err) => {
                console.log(err);
                alert('algo ha sucedido, no se puedo editar el producto')
            });
    }

    editProductquantity = (token, productId ,quantity) => {
        axios({
            method: "PUT",
            url: `https://marthacoffee.herokuapp.com/api/worker/editQuantity`,
            headers: { "Authorization": `${token}` },
            data: {productid: `${productId}`, quantity: `${quantity}`  }
        })
            .then((res) => {
                console.log(res) ;
                if (res.status === 200) {
                    alert('producto editado exitosamente')
                }
            })
            .catch((err) => {
                console.log(err);
                alert('algo ha sucedido, no se puedo editar el producto')
            });
    }

    NewUser = (token,cedula,firstname,lastname,email) => {
        console.log('entro')
        axios({
            method: "POST",
            url: `https://marthacoffee.herokuapp.com/api/casher/registerCustomer`,
            headers: { "Authorization": `${token}` },
            data: {cedula: `${cedula}`, firstname: `${firstname}`,lastname: `${lastname}`, email: `${email}`   },
        })
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    alert('Cliente agregado exitosamente')
                }
            })
            .catch((err) => {
                console.log(err);
                alert('algo ha sucedido, no se puedo registrar el cliente')
            });
    }
    
    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount() {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({ cart: dataCart });
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({ total: dataTotal });
        }

        try {
            axios({
                method: "GET",
                url: `https://marthacoffee.herokuapp.com/api/product/getProduct`,
                headers: { "Authorization": `${window.localStorage.getItem("USER_KEY")}` },
            }
            ).then((res) => {
                // console.log(res)
                this.setState({ products: res.data.products });
                return res;
            })
                .catch((err) => {
                    console.log(err)
                });

        } catch (err) {
            console.error(err.message);
        }
    };

    render() {
        const { products, cart, total } = this.state;
        const { addCart,removeProduct,addCategories, getTotal, removeTotal, addProduct,deleteProduct,editProductprice,editProductquantity,reduction,increase,addOrder,NewUser } = this;

        return (
            <DataContext.Provider
                value={{ products, cart, total,addCategories,reduction,increase,addCart,removeProduct, getTotal, removeTotal,addProduct,deleteProduct,editProductprice,editProductquantity,addOrder,NewUser }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }

}


