import React from "react";
import { ProductSection } from "../ProductSection/ProductSection";
import "./Index.css";
import { Box } from "@mui/material";

export default function Home({user, products, addUser, removeItemFromCart}) {
    return (
        <Box className="main">
            <Box className="container">
                <Box id="categoriesContainer">
                    <ProductSection user={user} products={products} addUser={addUser} removeItemFromCart={removeItemFromCart}/>
                </Box>
            </Box>
        </Box>
    )
}