import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Box from '@mui/material/Box';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { getProductsList } from "./store/userActions";
import { store } from "./store/store";
import { useDispatch, Provider } from "react-redux";
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await getProductsList(dispatch);
    }
    fetchData();
  }, []);

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
          <h1>Here is your shopping cart</h1>
        </PrivateRoute>
      } />
      <Route path="/account" element={
        <PrivateRoute>
          <h1>Here is your account history</h1>
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