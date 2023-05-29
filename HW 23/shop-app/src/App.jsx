import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import API from "./services/API";
import Header from "./components/common/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import './App.css';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [productList, setProductList] = useState({});

  useEffect(() => {
    API.getProductsList().then(res => setProductList(res))
  }, []);

  const addUser = (user) => {setUser(user); localStorage.setItem('user', JSON.stringify(user))};

  const removeUser = () => setUser({});

  const removeItemFromCart = (el) => {
    const newUser = {
      ...user, shoppingCart: [...user.shoppingCart.filter(item => item !== el)]
    }
    addUser(newUser);
  };

  return (
    <Routes >
      <Route path="/" element={
        <div className="body">
          <Header user={user} removeUser={removeUser} />
          <Home user={user} products={productList} addUser={addUser} removeItemFromCart={removeItemFromCart} />
        </div>
      } />
      < Route path="/login" element={
        < div className="body" >
          <Header user={user} removeUser={removeUser} />
          <Login addUser={addUser} />
        </div >
      } />
    </Routes >
  )
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper