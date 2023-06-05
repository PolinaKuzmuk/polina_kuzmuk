import React from 'react';
import API from '../../../services/API';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Link, Toolbar } from "@mui/material";
import Image from 'mui-image';
import './Header.css';

const Header = ({ user, removeUser }) => {
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

  const margin = {
    'margin': '0 auto 0 0'
  }

  return (
    <AppBar sx={{ 'position': 'relative' }}>
      <Toolbar className='header'>
        <Link className='logo' href='/' sx={margin}>
          <Image src="./img/logo.png" width={50} height={50} alt='logo' />
        </Link>
        <Box component="span" className='greeting'>Hi,
          <Link className='log log-in' href='/account'>
            {user.status ? ` ${user.name}` : 'Log In'}</Link>
        </Box>
        <Link className='shopping-cart-link' href='/cart'>
          <Image src="./img/shopping-cart.png" width={30} height={30} alt='shopping cart' />
          <Box className='shopping-cart-item'>{user.shoppingCart ? user.shoppingCart.length : 0}</Box>
        </Link>
        <Link className='log log-out' sx={{ml: 2}} href='/' style={style} onClick={logOut}>Log out</Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header;