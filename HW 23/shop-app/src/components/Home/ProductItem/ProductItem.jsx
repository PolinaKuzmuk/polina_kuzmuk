import React from "react";
import "./ProductItem.css";
import { updateActiveUserThunk } from "../../../store/user/userActions";
import { Box, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Image from 'mui-image';
import { useDispatch, useSelector } from "react-redux";

export default function ProductItem({ item }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const diskountSum = item.price * item.salePercent / 100;
    const newPrice = item.price - diskountSum;
    let inShoppingCart = false;
    const user = useSelector(store => store.user);

    if (user.status) {
        if (user.shoppingCart) {
            user.shoppingCart.forEach(el => {
                if (el.id === item.id) {
                    inShoppingCart = true;
                }
            })
        }
    }

    function addToCart(e) {
        if (user.status) {
            e.preventDefault();
            const updatedUser = {
                ...user, shoppingCart: [...user.shoppingCart, {
                    id: `${item.id}`,
                    count: 1
                }]
            }
            dispatch(updateActiveUserThunk(updatedUser))
                .then(() => {
                    e.target.parentElement.classList.add("product__cart—in");
                    inShoppingCart = true;
                })
        } else {
            navigate("/login");
        }
    }

    function removeFromCart(e) {
        e.preventDefault();
        user.shoppingCart.forEach(el => {
            if (el.id === item.id) {
                const updatedUser = {
                    ...user, shoppingCart: [...user.shoppingCart.filter(item => item !== el)]
                }
                dispatch(updateActiveUserThunk(updatedUser))
                    .then(() => {
                        e.target.parentElement.classList.remove("product__cart—in");
                        inShoppingCart = false;
                    })
            }
        })
    }

    return (
        <Box className="product-card" key={item.id}>
            <Image width={100} height={100} sx={{ mx: 'auto' }} src={`./img/products/${item.img}.png`} alt={item.title} />
            <Typography className="paragraph product-title">{item.title}</Typography>
            <Typography className={`paragraph sale ${item.sale ? "active" : ""}`}>
                <Box component="span" className="old-price">${item.price}</Box>
                <Box component="span" className="percent">-{item.salePercent}%</Box>
            </Typography>
            <Box className="price-wrap">
                <Typography className="paragraph current-price">${item.sale ? newPrice : item.price}</Typography>
                <Link className={`product-cart_link ${inShoppingCart ? "product__cart—in" : ''}`} sx={{ borderRadius: 2 }} onClick={inShoppingCart ? removeFromCart : addToCart}>
                    <Image className="product-cart_img" src="./img/shopping-cart.png" alt="add-to-cart" sx={{ p: 1 }} /></Link>
            </Box>
        </Box>
    );
}