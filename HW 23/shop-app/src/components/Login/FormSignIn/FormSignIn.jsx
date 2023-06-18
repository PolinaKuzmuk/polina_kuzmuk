import { Formik, Field, Form } from 'formik';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CustomButton from "../../common/Button/Button";
import API from "../../../services/API";
import "./FormSignIn.css";
import "../Login.css";
import { useDispatch } from "react-redux";
import { setActiveUSerThunk } from "../../../store/user/userActions";

export default function FormSignIn() {
    const [isErrorEmail, setErrorEmail] = useState(false);
    const [isErrorPass, setErrorPass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const style = {
        'margin': '0 15px 15px 0'
    }

    function signInFunc(values) {
        setErrorEmail(false);
        setErrorPass(false);

        let invalidEmailsList = [];
        API.getUsers().then(res => {
            res.filter(user => {
                if ((user.email.toLowerCase() === values.email.toLowerCase()) && (user.password === values.password)) {
                    dispatch(setActiveUSerThunk({ ...user, status: true }))
                        .then(() => {
                            localStorage.setItem('user', user.id);
                            navigate('/');
                        })
                }
                else if ((user.email.toLowerCase() === values.email.toLowerCase()) && (user.password !== values.password)) {
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
        <Box>
            <Typography variant="h2" className="login-title" fontSize="2rem">Secure Sign In</Typography>
            <Typography style={style} className="paragraph login-subtitle">For current customers</Typography>
            <Typography style={style} className={`paragraph error ${isErrorEmail ? 'active' : ''}`}>Invalid email.</Typography>
            <Typography style={style} className={`paragraph error ${isErrorPass ? 'active' : ''}`}>Invalid password.</Typography>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values) => signInFunc(values)}
            >
                <Form className='sign-in'>
                    <Field id="email" name="email" placeholder="Email Address" required/>
                    <Field id="password" name="password" placeholder="Password" required/>
                    <CustomButton className="btn btn__sign-in" type="submit" text="Sign in" />
                </Form>
            </Formik>
        </Box >
    )
}