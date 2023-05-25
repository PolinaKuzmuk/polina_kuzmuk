import React from "react";
import './Login.css';
import FormSignIn from "../FormSignIn/FormSignIn";
import FormRegistration from "../FormRegistration/FormRegistration";

const Login = () => {
    return (
        <main className="main">
            <div className="container container__grid">
                <FormSignIn />
                <FormRegistration/>
            </div>
        </main>
    )
}

export default Login;