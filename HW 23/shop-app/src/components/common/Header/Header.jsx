import React from 'react';
import API from '../../../services/API';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, removeUser, showItemsInCart }) => {
  const navigate = useNavigate();

  function logOut(e) {
    e.preventDefault();
    API.changeUserStatus(user, false)
      .then(() => {
        localStorage.removeItem('user');
        removeUser();
        navigate('/');
      })
  }

  const style = {
    display: user.status ? "inline-block" : "none"
  }

  return (
    <header className='header'>
      <a className='logo' href='/'>
        <img src="./img/logo.png" width='50' height='50' alt='logo' />
      </a>
      <nav>
        <span className='greeting'>Hi,
          <a className='log log-in' href={user.status ? '/account' : '/login'}>
            {user.status ? ` ${user.name}` : 'Log In'}</a>
        </span>
        <a className='shopping-cart-link' href={user.status ? '/shoppingCart' : 'login'}>
          <img src="./img/shopping-cart.png" width='30' height='30' alt='shopping cart' />
          <div className='shopping-cart-item'>{user.shoppingCart ? showItemsInCart() : 0}</div>
        </a>
        <a className='log log-out' href='/' style={style} onClick={logOut}>Log out</a>
      </nav>
    </header>
  )
}

export default Header;