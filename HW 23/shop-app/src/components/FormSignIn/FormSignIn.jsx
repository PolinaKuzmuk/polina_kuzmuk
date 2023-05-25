import React, { useState } from "react";
import Button from "../common/Button/Button";
import "./FormSignIn.css";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";

export default function FormSignIn() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isErrorEmail, setErrorEmail] = useState(false);
    const [isErrorPass, setErrorPass] = useState(false);
    const navigate = useNavigate();

    function signInFunc(e) {
        e.preventDefault();
        setErrorEmail(false);
        setErrorPass(false);

        API.getUsers()
            .then(res => {
                let invalidEmailsList = [];
                res.filter(user => {
                    if ((user.email.toLowerCase() === userEmail.toLowerCase()) && (user.password === userPassword)) {
                        API.changeUserStatus(user, true);
                        localStorage.setItem('user', JSON.stringify(user));
                        navigate('/index');
                    }
                    else if ((user.email.toLowerCase() === userEmail.toLowerCase()) && (user.password !== userPassword)) {
                        setErrorPass(true);
                    } else {
                        invalidEmailsList.push(user);
                    }
                })

                if (invalidEmailsList.length === res.length) {
                    setErrorEmail(true);
                }
            })
    };

    return (
        <form className="sign-in">
            <h2 className="login-title">Secure Sign In</h2>
            <p className="login-subtitle">For current customers</p>
            <p className={`error ${isErrorEmail ? 'active' : ''}`}>Invalid email.</p>
            <p className={`error ${isErrorPass ? 'active' : ''}`}>Invalid password.</p>
            <input type="email" name="email" placeholder="Email Address" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" autoComplete="on" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
            <Button className="btn btn__sign-in" type="submit" text="Sign in" onClick={signInFunc} />
        </form>
    )
}