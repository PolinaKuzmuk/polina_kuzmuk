import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Login from "./components/Login/Login";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/index" element={
        <div className="body">
          <Header />
          <h1>Home Page</h1>
        </div>
      } />
      < Route path="/login" element={
        < div className="body" >
          <Header />
          <Login />
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

export default AppWrapper;

// export default App;