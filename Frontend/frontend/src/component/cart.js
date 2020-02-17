import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from './navbar'

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            // cart_user_id:'',
            tokenId:localStorage.getItem("tokenuser")
            
        }
    }
    componentDidMount = () => {            
            Axios.get("http://127.0.0.1:5000/gettoken", {
                headers: {
                    Authorization: "Bearer " + this.state.tokenId,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                this.setState({
                    cart_user_id:response.data.user_id.toString(10)
                })
                let data = {
                    cart_user_id:this.state.cart_user_id
                }
                Axios.post("http://127.0.0.1:5000/viewcart",data, {
                    headers:{
                        cart_user_id:this.state.cart_user_id
                    }
                })
                .then(response => {
                    this.setState({
                        allData:response.data
                    })
                })
                .catch((err) => alert(err))
            })
            .catch((err) => alert(err))
    }
    onDelete = (cart_id) => {
        Axios.post("http://127.0.0.1:5000/removecart",{cart_id : cart_id})
            .then((response) => alert(response.data))
            .catch((err) => alert(err))
            window.location.reload(false)
            console.log(cart_id)
    }
    render() {
        console.log(this.state.allData.length)
        return (
            <>
            <Navbar/>
            <div className="p-5">
               {
                    this.state.allData.length !== 0  ?
                    this.state.allData.map((e) => {
                        return(
                            <div className="container">
                                <div className="card m-5 text-center">
                                    <div className = "card-header">
                                        <h1>{e.cart_prod_name}</h1>
                                    </div>
                                    <div className="cart-body">
                                        <h4 className="card-title">{e.cart_prod_price}</h4>
                                        <p className="cart-text">{e.cart_prod_description}</p>
                                    </div>
                                </div>
                                <button className="btn btn-warning offset-5" onClick={() => this.onDelete(e.cart_id)}>Remove from cart</button>
                            </div>
                        )
                    }): <h1 className="text-center">No Item Available in your Cart</h1> 
               }
            </div>  
            </>
        )
    }
}
