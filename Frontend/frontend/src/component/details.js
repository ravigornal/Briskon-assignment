import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            prod_id: '',
            cart_user_id:'',
            cart_prod_id:'',
            cart_prod_name:'',
            cart_prod_price:'',
            cart_prod_description:'',
            cart_prod_cat:'',
            tokenId:localStorage.getItem("tokenuser")
            
        }
    }
    componentDidMount = () => {
        Axios.get("http://127.0.0.1:5000/details",{
            headers:{
                prod_id:this.props.match.params.prod_id
            }
        })
            .then((response) => {
                this.setState({
                    allData:response.data[0],
                })
                console.log(this.state.allData)
            })
            .catch((err) => alert(err))
            
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
                console.log("This is user id: " + this.state.user_id)
            })
    }
    addCart = (e) =>{
        e.preventDefault()
        let data = {
            cart_user_id:this.state.cart_user_id,
                cart_prod_id:this.state.allData.prod_id,
                cart_prod_name:this.state.allData.prod_name,
                cart_prod_price:this.state.allData.prod_price,
                cart_prod_description:this.state.allData.prod_description,
                cart_prod_cat:this.state.allData.prod_cat
        }
        Axios.post("http://127.0.0.1:5000/addtocart",data,{
            headers:{
                cart_user_id:this.state.cart_user_id,
                cart_prod_id:this.state.allData.prod_id,
                cart_prod_name:this.state.allData.prod_name,
                cart_prod_price:this.state.allData.prod_price,
                cart_prod_description:this.state.allData.prod_description,
                cart_prod_cat:this.state.allData.prod_cat
            }
        })
        .then((response) => {alert("Added to Cart")})
        .catch((err) => alert(err))
    }
    render() {
        return (
            <div className="p-5">
                <div className="row">
                    <div className="col-6"> 
                        <img src = {`http://127.0.0.1:5000/${this.state.allData.prod_image}`} className="w-100"></img>
                    </div>
                    <div className="col-6">
                        <div className="mt-5 text-center">
                            <h1>{this.state.allData.prod_name}</h1>
                            <h1>{this.state.allData.prod_price}</h1>
                            <h3>{this.state.allData.prod_description}</h3>
                            <h3>{this.state.allData.no_of_unit}</h3>
                            <h3>{this.state.allData.prod_cat}</h3>
                            <Link to={`/buy/${this.state.allData.prod_id}`}><button className="btn btn-primary m-3">Buy Now</button></Link>
                            <button className="btn btn-warning m-3" onClick={this.addCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
