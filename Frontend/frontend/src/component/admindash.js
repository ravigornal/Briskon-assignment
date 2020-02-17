import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Admindash extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <div className="row p-5 d-flex justify-content-center">
                    <Link to="/additem">
                    <div className="col-3">
                        <button className="btn-primary btn-lg" style={{height:"100px", width:"150px"}}>Add</button>
                    </div></Link>

                    <Link to="/edit">
                    <div className="col-3">
                        <button className="btn-primary btn-lg" style={{height:"100px", width:"150px"}}>Edit</button>
                    </div>
                    </Link>

                    <Link to="/delete">
                    <div className="col-3">
                        <button className="btn-primary btn-lg" style={{height:"100px", width:"150px"}}>Delete</button>
                    </div>
                    </Link>

                    <Link to="/">
                    <div className="col-3">
                        <button className="btn-primary btn-lg" style={{height:"100px", width:"150px"}}>Approve</button>
                    </div>
                    </Link>
                </div>
            </div>
        )
    }
}
