import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Box from '@mui/material/Box';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { getProductsListThunk } from "./store/products/productsActions";
import { store } from "./store/store";
import { useDispatch, Provider } from "react-redux";
import './App.css';
import Cart from "./components/Cart/Cart";
import { Account } from "./components/Account/Account";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsListThunk())
  }, [])

  return (
    <Routes>
      <Route path="/" element={
        <Box className='body'>
          <Header />
          <Home />
        </Box>
      } />
      < Route path="/login" element={
        < Box className="body" >
          <Header />
          <Login />
        </Box >
      } />
      <Route path="/cart" element={
        <PrivateRoute>
          < Box className="body" >
            <Header />
            <Cart />
          </Box>
        </PrivateRoute>
      } />
      <Route path="/account" element={
        <PrivateRoute>
          <Header />
          <Account />
        </PrivateRoute>
      } />
    </Routes>
  )
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default AppWrapper