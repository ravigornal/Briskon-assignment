import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
export default class Navigation extends Component {
    render() {
        return (
            <div>
                <center>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link className="nav-item nav-link text-white p-3" style={{ fontSize: "15px" }} to="/">Home</Link>
                                <Nav.Link className="nav-item nav-link text-white p-3" style={{ fontSize: "15px" }} to="/Searchdonor">Something</Nav.Link>
                            </Nav>
                            <Nav className="mr-auto w-25">
                               <h1 className="offset-6  text-warning">E-Bazar</h1>
                            </Nav>
                            <Nav>
                                <Nav.Link className="nav-item nav-link text-white p-3" style={{ fontSize: "15px" }}>Something</Nav.Link>
                                <Link className="nav-item nav-link text-white p-3" style={{ fontSize: "15px" }} to="/cart">Cart</Link>
                                <Link className="nav-item nav-link text-white p-3" style={{ fontSize: "15px" }} to="/login">Login</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar> 
                </center>
            </div>
        )
    }
}
