import React, { Component } from 'react'
import Axios from 'axios'
export default class Buy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ordered_user_id:'',
            ordered_prod_id:'',
            buyer_name:'',
            address:'',
            mobile:"",
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
                ordered_user_id:response.data.user_id.toString(10),
            })
            console.log(this.state.ordered_user_id + " this is ordered_user_id")
        })
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            ordered_prod_id:this.props.match.params.prod_id
        }
        Axios.post("http://127.0.0.1:5000/buy",data,{
            headers:{
                ordered_user_id:this.state.ordered_user_id,
                ordered_prod_id:this.props.match.params.prod_id,
                address:this.state.address,
                mobile:this.state.mobile,
                buyer_name:this.state.buyer_name
            }
        })
        .then((response) => {
            this.setState={
                ordered_prod_id:this.props.match.params.prod_id
            }
            alert("Your Order is Placed")
        })
        .catch((err) => alert(err))
    }
    render() {
        return (
            <div>
               <form onSubmit={this.handleSubmit}>
                        <input type="text" name="buyer_name" placeholder="Name" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>                 
                        <input type="text" name="address" placeholder="Address" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>                    
                        <input type="number" name="mobile" placeholder="Enter Mobile" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>
                        <button type="submit" className="btn btn-primary rounded-pill w-25 sm-w-50 mt-3 ">Submit</button>
                    </form>
            </div>
        )
    }
}
