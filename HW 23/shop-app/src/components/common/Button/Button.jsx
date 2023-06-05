import React from "react";
import { Button } from "@mui/material";
import "./Button.css";


export default function CustomButton({ className, type, text, onClick }) {
    const style = {
        width: 'fit-content',
        color: '#ffffff',
        fontWeight: 700,
        backgroundColor: '#d73a3e',
        border: 'none',
        borderRadius: 20,
        padding: '10px 30px',
        cursor: 'pointer'
    }
    return (
        <Button sx={style} className={className} type={type} onClick={onClick}>{text}</Button>
    )
}