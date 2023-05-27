import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import API from "./services/API";
import Header from "./components/common/Header/Header";
import Index from "./components/Index/Index";
import Login from "./components/Login/Login";
import './App.css';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [productList, setProductList] = useState({});

  useEffect(() => {
    API.getProductsList().then(res => setProductList(res))
  }, []);

  const addUser = (user) => setUser(user);

  const removeUser = () => setUser({});

  const showItemsInCart = () => {
    if (user.shoppingCart.length > 0) {
      let userOrders = user.shoppingCart ? (user.shoppingCart).reduce((acc, item) => acc + Number(item.count), 0) : 0;
      return userOrders;
    } else {
      return 0;
    }
  }

  return (
    <Routes >
      <Route path="/" element={
        <div className="body">
          <Header user={user} removeUser={removeUser} showItemsInCart={showItemsInCart} />
          <Index user={user} products={productList} addUser={addUser} showItemsInCart={showItemsInCart} />
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