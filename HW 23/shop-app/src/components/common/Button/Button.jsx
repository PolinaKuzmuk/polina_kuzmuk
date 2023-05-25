import React from "react";
import "./Button.css";


export default function Button({ className, type, text, onClick }) {
    return (
        <button className={className} type={type} onClick={onClick}>{text}</button>
    )
}