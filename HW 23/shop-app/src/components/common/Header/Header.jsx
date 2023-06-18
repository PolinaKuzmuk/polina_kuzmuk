import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Link, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { removeActiveUserThunk } from '../../../store/user/userActions';
import Image from 'mui-image';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector(store => store.user);

  const itemsInCart = () => {
    if (user.shoppingCart.length > 0) {
      return user.shoppingCart.reduce((acc, item) => acc + Number(item.count), 0)
    } else {
      return 0
    }
  }

  async function logOut(e) {
    e.preventDefault();
    dispatch(removeActiveUserThunk(user))
      .then(() => {
        localStorage.removeItem('user');
        navigate('/');
      })
  }

  const logOutstyle = {
    display: user.status ? "inline-block" : "none",
    color: '#ffffff',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    textDecoration: 'none'
  }

  const greetingStyle = {
    color: '#ffffff',
    textDecoration: 'underline dashed',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }

  const margin = {
    'margin': '0 auto 0 0'
  }

  return (
    <AppBar sx={{ 'position': 'relative' }}>
      <Toolbar className='header'>
        <Link className='logo' href='/' sx={margin}>
          <Image src="./img/logo.png" width={50} height={50} alt='logo' />
        </Link>
        <Box component="span" className='greeting' style={greetingStyle}>Hi,
          <Link className='log log-in' href='/account' style={greetingStyle}>
            {user.status ? ` ${user.name}` : ' Log In'}</Link>
        </Box>
        <Link className='shopping-cart-link' href='/cart'>
          <Image src="./img/shopping-cart.png" width={30} height={30} alt='shopping cart' />
          <Box className='shopping-cart-item'>{user.status ? itemsInCart() : 0}</Box>
        </Link>
        <Link className='log log-out' sx={{ ml: 2 }} href='/' style={logOutstyle} onClick={logOut}>Log out</Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header;