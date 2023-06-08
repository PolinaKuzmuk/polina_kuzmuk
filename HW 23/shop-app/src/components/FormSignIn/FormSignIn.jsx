import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Typography } from "@mui/material";
import CustomButton from "../common/Button/Button";
import API from "../../services/API";
import "./FormSignIn.css";
import "../Login/Login.css";
import { useDispatch } from "react-redux";
import { setActiveUSer } from "../../store/userActions";

export default function FormSignIn() {
    const [userEmail, setUserEmail] = useState(false);
    const [userPassword, setUserPassword] = useState(false);
    const [isErrorEmail, setErrorEmail] = useState(false);
    const [isErrorPass, setErrorPass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function signInFunc(e) {
        e.preventDefault();
        setErrorEmail(false);
        setErrorPass(false);

        let invalidEmailsList = [];
        API.getUsers().then(res => {
            res.filter(user => {
                if ((user.email.toLowerCase() === userEmail.toLowerCase()) && (user.password === userPassword)) {
                    API.changeUserStatus(user, true).then(() => {
                        localStorage.setItem('user', user.id);
                        setActiveUSer(dispatch, {...user, status: true});
                        navigate('/');
                    });
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

    const style = {
        'margin': '0 15px 15px 0'
    }

    return (
        <FormControl className="sign-in">
            <Typography variant="h2" className="login-title" fontSize="2rem">Secure Sign In</Typography>
            <Typography className="paragraph login-subtitle">For current customers</Typography>
            <Typography className={`paragraph error ${isErrorEmail ? 'active' : ''}`}>Invalid email.</Typography>
            <Typography className={`paragraph error ${isErrorPass ? 'active' : ''}`}>Invalid password.</Typography>
            <TextField style={style} size="small" type="email" name="email" placeholder="Email Address" value={userEmail || ""} onChange={e => setUserEmail(e.target.value)} />
            <TextField style={style} size="small" type="password" name="password" placeholder="Password" value={userPassword || ""} onChange={e => setUserPassword(e.target.value)} />
            <CustomButton className="btn btn__sign-in" type="submit" text="Sign in" onClick={signInFunc} />
        </FormControl>
    )
}
