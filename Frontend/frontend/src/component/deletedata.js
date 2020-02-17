import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
export default class Deletedata extends Component {
    constructor(props){
        super(props)
        this.state = {
            prod_id:""
        }
        console.log(this.state.prod_id)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let data = this.props.match.params.prod_id
        Axios.post("http://127.0.0.1:5000/delete", data, {
            headers:{
                prod_id:this.props.match.params.prod_id
            }
        })
        .then((response) => {
            alert(response.data)
            window.location.href = "/admindash"
        })
        .catch((err) => alert(err))
    }
    render() {
        return (
            <div>
                <center>
                    <h2>Are you Sure You want to delete?</h2>
                    <Link to='/admindash'><button className="btn btn-success m-5">Cancle</button></Link>
                    <button onClick={this.handleSubmit} className="btn btn-danger m-5">Delete</button>
                </center>
            </div>
        )
    }
}
