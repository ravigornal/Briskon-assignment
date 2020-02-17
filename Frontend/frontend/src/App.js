import React,{Component} from 'react';
import {Route, Redirect, Router} from 'react-router-dom'
import Home from './component/home'
import Details from './component/details'
import Adminlogin from './component/adminlogin'
import Adminsignup from './component/adminsignup'
import Admindash from './component/admindash'
import Additem from './component/additem'
import Edit from './component/edit'
import Editdata from './component/editdata'
import Delete from './component/delete'
import Deletedata from './component/deletedata'
import Login from './component/userlogin'
import Cart from './component/cart'
import Buy from './component/buy'
import Orderdetails from './component/orderdetails'
import Home1 from './component/home1'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render(){
    return (
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/details/:prod_id" render={(props) => <Details {...props}/>}/>
        <Route path="/adminlogin" component={Adminlogin}/>
        <Route path="/adminsignup" component={Adminsignup}/>
        <Route path="/admindash" component={Admindash}/>
        <Route path="/additem" component={Additem}/>
        <Route path="/edit" component={Edit}/>
        <Route path="/editdata/:prod_id" render={(props) => <Editdata {...props}/>}/>
        <Route path="/delete" render={(props) => <Delete {...props}/>}/>
        <Route path="/deletedata/:prod_id" render={(props) => <Deletedata {...props}/>}/>
        <Route path="/login" component={Login}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/buy/:prod_id" render={(props) => <Buy {...props}/>}/>
        <Route path="/orderdetails" component={Orderdetails}/>
        {/* <Home1/> */}
      </div>
    );
  }
}

export default App