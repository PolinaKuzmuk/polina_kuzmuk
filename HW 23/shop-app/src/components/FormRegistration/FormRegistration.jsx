import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../common/Button/Button";
import API from "../../services/API";
import "./FormRegistration.css";
import { FormControl, TextField, Typography } from "@mui/material";

export default function FormRegistration({ addUser }) {
    const [fullname, setFullname] = useState(false);
    const [userEmail, setUserEmail] = useState(false);
    const [userPassword, setUserPassword] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState(false);
    const [isErrorEmail, setErrorEmail] = useState(false);
    const [isErrorPass, setErrorPass] = useState(false);
    const navigate = useNavigate();

    function createUserAccount(e) {
        e.preventDefault();
        setErrorEmail(false);
        setErrorPass(false);
        if (userPassword !== verifyPassword) {
            setErrorPass(true);
        } else {
            API.getUsers().then(res => {
                let findDuplicateUser = res.filter(user => user.email === userEmail);
                if (findDuplicateUser.length === 0) {
                    const newUser = {
                        orders: [],
                        shoppingCart: [],
                        name: fullname,
                        email: userEmail,
                        password: userPassword,
                        status: true
                    };
                    API.createUser(newUser).then(() => {
                        API.getUsers().then(res => {
                            res.filter(user => {
                                if (user.email.toLowerCase() === userEmail.toLowerCase()) {
                                    localStorage.setItem('user', JSON.stringify(user));
                                    addUser(user);
                                    navigate('/');
                                }
                            })
                        })
                    })
                } else if (findDuplicateUser.length > 0) {
                    setErrorEmail(true);
                }
            })
        }
    }

    const style = {
        'margin': '0 15px 15px 0'
    }

    return (
        <FormControl className="registration">
            <Typography variant="h2" className="login-title" fontSize="2rem">Quick registration</Typography>
            <Typography className="paragraph login-subtitle">For new customers</Typography>
            <Typography className={`paragraph error ${isErrorEmail ? 'active' : ''}`}>User with email {userEmail} already exist!</Typography>
            <Typography className={`paragraph error ${isErrorPass ? 'active' : ''}`}>Password not matches!</Typography>
            <TextField style={style} size="small" type="text" name="full-name" placeholder="Full name" value={fullname || ''} onChange={e => setFullname(e.target.value)} required />
            <TextField style={style} size="small" type="email" name="email" placeholder="Email Address" value={userEmail || ''} onChange={e => setUserEmail(e.target.value)} required />
            <TextField style={style} size="small" type="password" name="password" placeholder="Password" value={userPassword || ''} onChange={e => setUserPassword(e.target.value)} required />
            <TextField style={style} size="small" type="password" name="verify-password" placeholder="Verify password" value={verifyPassword || ''} onChange={e => setVerifyPassword(e.target.value)} required />
            <CustomButton className="btn btn__register" type="submit" text="Create account" onClick={createUserAccount} />
        </FormControl>
    )
}