import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import API from "../../services/API";
import "./FormRegistration.css";

export default function FormRegistration({addUser}) {
    const [fullname, setFullname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
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

    return (
        <form className="registration">
            <h2 className="login-title">Quick registration</h2>
            <p className="login-subtitle">For new customers</p>
            <p className={`error ${isErrorEmail ? 'active' : ''}`}>User with email {userEmail} already exist!</p>
            <p className={`error ${isErrorPass ? 'active' : ''}`}>Password not matches!</p>
            <input type="text" name="full-name" placeholder="Full name" value={fullname} onChange={e => setFullname(e.target.value)} required />
            <input type="email" name="email" placeholder="Email Address" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
            <input type="password" name="password" placeholder="Password" autoComplete="on" value={userPassword} onChange={e => setUserPassword(e.target.value)} required />
            <input type="password" name="verify-password" placeholder="Verify password" autoComplete="on" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} required />
            <Button className="btn btn__register" type="submit" text="Create account" onClick={createUserAccount} />
        </form>
    )
}


