import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import Box from '@mui/material/Box';
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const ProductSection = () => {
    const productList = useSelector(store => store.products);

    return (
        Object.keys(productList).map(key => {
            return (
                <Container key={key} className="category" dataname={key}>
                    <Typography fontSize="2rem" variant="h2">{key}</Typography>
                    <Box key={`container-${key}`} className="category__container">{
                        productList[key].map(item => {
                            return (
                                <ProductItem item={item} key={item.title} />
                            )
                        })
                    }</Box>
                </Container>
            )
        })
    )
}