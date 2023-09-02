import logo from "./logo.svg";
import "./App.css";
import Search from "./components/search";
import ProductList from "./components/productlist";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginForm from "./components/loginform";
import AddProduct from "./components/productform";
import ProductService from "./services/productservice";
import UseEffectDemo from "./components/useeffectdemo";
import ViewProduct from "./components/viewproduct";
import Counter from "./components/useReducerDemo";
import BankAccount from "./components/bankaccount";
import Registration from "./components/registrationdemo";
import Logout from "./components/logout";
import UserInfo from "./components/userinfo";

function App() {
  let [username,setUsername]=useState('')
  let [authorities,setAuthorities]=useState('')
  useEffect(()=>{
    setUsername(localStorage.getItem("username"))
    setAuthorities(localStorage.getItem("authorities"))
    
  },[])
  return (
    <div className="App">
      {typeof authorities}<br/>
      {authorities}
      
       <BrowserRouter>
        <nav className="nav navbar-expand navbar-dark">
          <div className="nav-link">
            <Link to="/products">Products</Link>
          </div>
          {!username ? <div className="nav-link">
            <Link to="/loginform">Login</Link>
          </div> : <div className="nav-link">
            <Link to="/logout">Logout</Link>
            </div>}
          {!username?
          <div className="nav-link">
          <Link to="/register">Register</Link>
          </div>:''
           }
           {authorities==='Admin'?
          <div className="nav-link">
            <Link to="/productform">Add Product</Link>
          </div>
           :''
          }
          {authorities==='User'?
          <div className="nav-link">Offers</div>:''}
          {username? <div className="nav-link">
            Welcome {username}
          </div>:''}
          {!username?'':<div className="nav-link">
            <Link to="/userinfo">Userinfo</Link></div>}
        </nav>
        {/* <UseEffectDemo/> */}
        <Routes>
          <Route path="/products"
            element={
                <ProductList  />
            }
          />
          <Route path="/loginform" 
                element={<LoginForm setUsername={setUsername} 
                setAuthorities={setAuthorities}/>}>
          </Route>
          <Route path="/register" element={<Registration/>}></Route>
          <Route path="/productform" element={<AddProduct/>}></Route>
          <Route path="/edit/:id" element={<AddProduct/>}></Route>
          <Route path="/viewproduct/:id" element={<ViewProduct/>}></Route>
          <Route path="/userinfo" element={<UserInfo/>}></Route>
          <Route path="/logout" 
          element={<Logout 
            setUsername={setUsername} 
            setAuthorities={setAuthorities}/>}>
        </Route>
        </Routes>
       {/* <BankAccount/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
