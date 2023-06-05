import React from "react";
import './Login.css';
import FormSignIn from "../FormSignIn/FormSignIn";
import FormRegistration from "../FormRegistration/FormRegistration";
import { Box } from "@mui/material";

const Login = ({ addUser }) => {
    return (
        <main className="main">
            <Box className="container container__grid">
                <FormSignIn addUser={addUser} />
                <FormRegistration addUser={addUser} />
            </Box>
        </main>
    )
}

export default Login;