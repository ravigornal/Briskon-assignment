import React, { Component } from 'react'
import Axios from 'axios'
import './adminsignup.css'

export default class Adminsignup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            admin_name:"",
            admin_email:"",
            password:"",
            admin_mobile:"",
            admin_image:""
        }
    }
    addimage = (e) => {
        this.setState({
            admin_image:e.target.files[0]
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
        const formData = new FormData();
        formData.append('admin_image', this.state.admin_image)
        Axios.post("http://127.0.0.1:5000/admin.signup", formData, {
            headers:{
                admin_name:this.state.admin_name,
                admin_email:this.state.admin_email,
                admin_mobile:this.state.admin_mobile,
                password:this.state.password
            }
        })
        .then((response) => {
            alert(response.data)
            window.location.href="/"
        })
        .catch((err) => {
            alert(err)
        })
    }
    render() {
        return (
            <div id="body">
                <div style={{paddingTop:"15%"}}></div>
                <div className="container bg-light shadow-lg w-50 py-5 " style={{borderRadius:"1%"}}>
                    <h1 className="text-dark">Signup</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="admin_name" placeholder="Full Name" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>                 
                        <input type="email" name="admin_email" placeholder="Email Id" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>                    
                        <input type="number" name="admin_mobile" placeholder="Enter Mobile" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>
                        <input type="password" name="password" placeholder="Choose Password" className="form-control w-50 mt-2 offset-3" onChange={this.handleChange}></input>
                        <input type="file" name="admin_image" placeholder="Select Image" className="form-control-file w-50 mt-2 offset-3" onChange={this.addimage}></input>
                        <button type="submit" className="btn btn-primary rounded-pill w-25 sm-w-50 mt-3 ">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
