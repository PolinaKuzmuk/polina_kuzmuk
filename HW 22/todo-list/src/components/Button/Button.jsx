import React from "react";
import "../Button/Button.css";

const Button = ({ title, style, className, action = () => { } }) => {
    return (
        <button type="button" style={style} className={`btn ${className ? className : ''}`} onClick={action}>{title}</button>
    )
}

export default Button;