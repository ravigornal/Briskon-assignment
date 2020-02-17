import React, { Component } from 'react'
import Axios from 'axios'

export default class Orderdetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ordered_user_id:'',
            allData:[],
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
            console.log(response.data.user_id.toString(10))
            this.setState({
                ordered_user_id:response.data.user_id.toString(10),
            })
            Axios.get("http://127.0.0.1:5000/orderdetails", {
                headers:{
                    ordered_user_id:response.data.user_id.toString(10)
                }
            })
            .then(response => {
                this.setState({
                    allData:response.data
                })
    
            })
            .catch((err) => alert(err))
        })

       
    }
    render() {
        return ( 
            <div>
                {   
                    this.state.allData !== 0 ?
                    this.state.allData.map((e) => {
                        return (
                            <div className="container">
                                <div className = "card mt-5 text-center"> 
                                    <diiv className="card-header">
                                        <h1>{e.prod_name}</h1>
                                    </diiv>
                                    <div className="card-body">
                                    <h4 className="card-title">{e.prod_price}</h4>
                                        <p className="cart-text">{e.prod_description}</p> 
                                    </div>
                                    <div className = "card-footer">
                                        <h4>{e.ordered_at}</h4>
                                    </div>
                                </div>
                            </div>  
                        )
                    }): <h1 className="text-center">You haven't Ordered anything yet</h1>
                }
            </div>
        )
    }
}
