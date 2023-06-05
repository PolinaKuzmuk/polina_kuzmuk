import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import Box from '@mui/material/Box';
import { Container, Typography } from "@mui/material";

export const ProductSection = ({ user, products, addUser, removeItemFromCart }) => {
    return (
        Object.keys(products).map(key => {
            return (
                <Container key={key} className="category" dataname={key}>
                    <Typography fontSize="2rem" variant="h2">{key}</Typography>
                    <Box key={`container-${key}`} className="category__container">{
                        products[key].map(item => {
                            return (
                                <ProductItem user={user} item={item} addUser={addUser} removeItemFromCart={removeItemFromCart} key={item.title} />
                            )
                        })
                    }</Box>
                </Container>
            )
        })
    )
}