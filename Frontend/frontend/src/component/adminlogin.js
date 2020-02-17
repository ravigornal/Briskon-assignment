import React, { Component } from 'react'
import Axios from 'axios'
import './login_page.css'
import {Link} from 'react-router-dom'
export default class Adminlogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            admin_email:"",
            password:""
        }
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
        let loginDetails = {
            admin_email:this.state.admin_email,
            password:this.state.password
        }
        Axios.post("http://127.0.0.1:5000/admin.login", loginDetails)
            .then((response) => {
                console.log(response.data)
                if(response.data == "Wrong Password") {
                    alert(response.data)
                }
                else{
                    alert("welcome")
                    window.localStorage.setItem("tokenadmin", response.data)
                    window.location.href ="/admindash"
                }
            })
            .catch((err) => alert(err))
    }
    render() {
        return (
            <div id="body">
            <div style={{paddingTop:"14%"}}></div>
            <div className="container bg-light shadow-lg w-75" style={{borderRadius:"1%"}}>
                <form onSubmit={this.handleSubmit}> 
                    <div className="row">
                        <div className=" col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <img src="twitter.png" style={{marginTop:"20%"}}></img>
                        </div>
                        <div className=" col-xl-6 col-lg-6 col-md-12 col-sm-12 py-5" >
                            <h1 className="text-dark">Admin Login</h1>
                            <div className=" offset-3 pt-5">
                                <input name="admin_email" type="email" placeholder="Email Id" className="rounded-pill form-control w-75" onChange={this.handleChange}></input><br></br>
                                <input name="password" type="password" placeholder="Password" className="rounded-pill form-control w-75" onChange={this.handleChange}></input><br></br>
                                <button className="rounded-pill bg-success form-control w-75"><h5 className="text-light">Login</h5></button>
                            </div>
                            <div className="text-center mt-3">
                                <Link to="/adminsignup"><p>Create admin account</p></Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}
