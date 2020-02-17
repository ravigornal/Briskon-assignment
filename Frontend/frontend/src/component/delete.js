import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from './navbar'
import {Link} from 'react-router-dom'
export default class Delete extends Component {
    constructor(props){
        super(props)
        this.state = {
            allcat:[],
            allData:[],
            prod_cat:""
        }
    }
    handleChange = (e) => {
        this.setState({
            prod_cat:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let head = {
            prod_cat:this.state.prod_cat
        }
        Axios.get("http://127.0.0.1:5000/distcat",{
            headers:{
                prod_cat:this.state.prod_cat
            }
        })
            .then((response) => {
                this.setState({
                    allData:response.data.datas,
                })
            })
            .catch((err) => alert(err))
    }
    componentDidMount = () => {
        Axios.get("http://127.0.0.1:5000/distcat")
            .then((response) => {
                this.setState({
                    allcat:response.data.items,
                })
            })
            .catch((err) => alert(err))
    }
    render() {
        return (
            <div>
                <center>
                    <form onSubmit={this.handleSubmit} >
                        <select onChange={this.handleChange} name="prod_cat" className="form-control">
                            <option>Choose</option>
                            {
                                this.state.allcat.map((e) => {
                                    return(
                                        <>  
                                            <option value={e.prod_cat}  >{e.prod_cat}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                        <button type = "submit" className="btn btn-warning">Submit</button>
                    </form>
                </center>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Available Unit</th>
                        </tr>
                    </thead>
                    {
                        this.state.allData.map((e) => {
                            return (
                                <tbody>
                                    <tr>
                                    <td><Link to={`/deletedata/${e.prod_id}`}>{e.prod_name}</Link></td>
                                        <td>{e.prod_price}</td>
                                        <td>{e.prod_cat}</td>
                                        <td>{e.prod_description}</td>
                                        <td>{e.no_of_unit}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        )
    }
}
