import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from './navbar'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            allData : [],
            per_page:0,
            change_page:{page:1},
            total_pages:0,
            filteredData:[],
            prod_name:"",
        }
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        Axios.get("http://127.0.0.1:5000/search",{
            headers:{
                prod_name:this.state.prod_name
            }
        })
            .then((response) => {
                this.setState({
                    filteredData:response.data
                })
                console.log(this.state.filteredData)
            })
            .catch((err) => alert(err))
    }
    componentDidMount = (page = 1) => {
        Axios.get(`http://127.0.0.1:5000/home?page=${page}`)
            .then((response) => {
                this.setState({
                    allData:response.data.data,
                    total_pages:response.data.total_pages
                })
            })
            .catch((err) => alert(err))
    }
    pagination = (pageNo) => {
        let updatePage = this.state.change_page
        updatePage.page = pageNo
        this.setState({
            change_page : updatePage
        },
        () => {
            this.props.history.push(`?${queryString.stringify(updatePage)}`);
        })
        
        this.componentDidMount(this.page = pageNo);
    };
    handlePageChange = (page,e) => {
        this.setState({
            currentPage:page
        })
    }
    rowChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        const pageNumber = [];
        for(var i = 1; i <= this.state.total_pages; i++) {
            pageNumber.push(i)
        }
        const showpageNumber = pageNumber.map(number => {
            return(
                <button className="btn m-2 btn-info" onClick={() => this.pagination(number)}>{number}</button>
            )
        })
        return (
            <>
            <div>
                <Navbar/>
            </div>
            <form className = 'float-right my-3 d-flex mr-5' onSubmit={this.handleSubmit}>
                <input placeholder="Item Name" className="form-control ml-n5" name="prod_name" onChange={this.handleChange}></input>
                <button>Search</button>
            </form>

            <div className="mt-5">
               
               {    

                this.state.filteredData.length !== 0 ?
                    this.state.filteredData.map((e) => {
                            return(
                                <Link to={`/details/${e.prod_id}}`}>
                                    <div className="float-left ml-5 mt-5 card" style={{width:"18rem"}}> 
                                            <div className="text-center"> 
                                                <img src = {`http://127.0.0.1:5000/${e.prod_image}`} className="img-fluid" ></img>
                                                <h1 className="card-title">{e.prod_name}</h1>
                                                <h2 className="card-title">{e.prod_price}</h2>
                                            </div>
                                        
                                        <div>
                                            <button className="btn btn-primary offset-4 mt-3 mb-3">Details</button>
                                        </div>
                                    </div>
                                 </Link>
                            )
                        }) : this.state.filteredData.length == 0 ?
                            this.state.allData.map((e) => {
                                return(
                                <Link to={`/details/${e.prod_id}}`}>
                                    <div className="float-left ml-5 mt-5 card" style={{width:"18rem"}}>
                                            <div className="text-center"> 
                                                <img src = {`http://127.0.0.1:5000/${e.prod_image}`} className="img-fluid" ></img>
                                                <h3 className="card-title">{e.prod_name}</h3>
                                                <p className="card-title">{e.prod_price}</p>
                                            </div>
                                        <div>
                                            <button className="btn btn-primary offset-4 mt-3 mb-3">Details</button>
                                        </div>
                                    </div>
                                </Link>
                                )
                                }):null
                }      
            </div>
            <div className="offset-5" style={{marginTop:"30%"}}>
            {this.page > 1 ? <li className={`btn btn-success`} onClick={()=>this.pagination(this.page-1)}><a href="#">Prev</a></li>:''}
                    {showpageNumber}
                {this.page < this.state.total_pages ? <li className={`btn btn-success`} onClick={()=>this.pagination(this.page+1)}><a href="#">Next</a></li>:''}
                {this.currentPage < this.state.total_pages ? <li className={`btn btn-success`} onClick={()=>this.pagination(this.page+1)}><a href="#">last</a></li>:''}
            </div>
            </>
        )
    }
}
