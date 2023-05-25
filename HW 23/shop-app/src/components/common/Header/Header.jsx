import React from 'react';
import logo from '../../../img/logo.png';
import cart from '../../../img/shopping-cart.png';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <a className='logo' href='index'>
        <img src={logo} width='50' height='50' alt='logo' />
      </a>
      <nav>
        <span className='greeting'>Hi, <a className='log log-in' href='login'>Log in</a></span>
        <a className='shopping-cart-link' href='login'>
          <img src={cart} width='30' height='30' alt='shopping cart' />
          <div className='shopping-cart-item'>0</div>
        </a>
        <a className='log log-out' href='index'>Log out</a>
      </nav>
    </header>
  )
}

export default Header;