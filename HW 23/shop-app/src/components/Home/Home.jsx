import React from "react";
import { ProductSection } from "./ProductSection/ProductSection";
import "./Index.css";
import { Box, Typography } from "@mui/material";

export default function Home() {
    return (
        <Box className="main">
            <Box className="container">
                <Box id="categoriesContainer">
                    {/* <ProductSection /> */}
                    <Typography>hello</Typography>
                </Box>
            </Box>
        </Box>
    )
}