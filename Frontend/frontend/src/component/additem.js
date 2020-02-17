import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export default class Additem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prod_name: "",
            prod_price:"",
            prod_cat:"",
            prod_description:"",
            prod_image:"",
            no_of_unit:""
        }
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    addimage = (e) => {
        this.setState({
            prod_image:e.target.files[0]
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('prod_image', this.state.prod_image)
        Axios.post("http://127.0.0.1:5000/addproduct", formData,{
            headers:{
                prod_name:this.state.prod_name,
                prod_price:this.state.prod_price,
                prod_cat:this.state.prod_cat,
                prod_description:this.state.prod_description,
                no_of_unit:this.state.no_of_unit
            }
        })
        .then((response) => {
            alert(response.data)
            console.log(response.data)
            window.location.href='/admindash'
        })
        .catch((err) => alert(err))
    }
    render() {
        return (
            <div id="body">
                <div style={{paddingTop:"15%"}}></div>
                <div className="container bg-light shadow-lg w-50 py-5 " style={{borderRadius:"1%"}}>
                    <h1 className="text-dark text-center">Add item</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="prod_name" placeholder="Product Name" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>                 
                        <input type="text" name="prod_price" placeholder="Price" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>                    
                        <input type="text" name="prod_cat" placeholder="Category" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>
                        <input type="text" name="prod_description" placeholder="Description" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>
                        <input type="text" name="no_of_unit" placeholder="No of unit" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>
                        <input type="file" name="prod_image" placeholder="Select Image" className="form-control-file w-50 mt-2 offset-3" onChange={this.addimage}></input>
                        <button type="submit" className="btn btn-primary rounded-pill w-25 sm-w-50 mt-3 offset-5 ">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
