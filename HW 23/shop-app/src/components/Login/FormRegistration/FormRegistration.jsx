import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../common/Button/Button";
import API from "../../../services/API";
import { setActiveUSerThunk } from "../../../store/user/userActions";
import "./FormRegistration.css";
import { Formik, Field, Form } from 'formik';
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function FormRegistration() {
    const [userEmail, setUserEmail] = useState(false);
    const [isErrorEmail, setErrorEmail] = useState(false);
    const [isErrorPass, setErrorPass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function createUserAccount(values) {
        setUserEmail(values.email);
        setErrorEmail(false);
        setErrorPass(false);
        if (values.password !== values.verifyPassword) {
            setErrorPass(true);
        } else {
            API.getUsers().then(res => {
                let findDuplicateUser = res.filter(user => user.email === values.email);
                if (findDuplicateUser.length === 0) {
                    const newUser = {
                        orders: [],
                        shoppingCart: [],
                        name: values.fullName,
                        email: values.email,
                        password: values.password,
                        status: true
                    };
                    API.createUser(newUser).then(() => {
                        API.getUsers().then(res => {
                            res.filter(user => {
                                if (user.email.toLowerCase() === values.email.toLowerCase()) {
                                    dispatch(setActiveUSerThunk(user))
                                        .then(() => {
                                            localStorage.setItem('user', user.id);
                                            navigate('/');
                                        })
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
        <Box>
            <Typography variant="h2" className="login-title" fontSize="2rem">Quick registration</Typography>
            <Typography style={style} className="paragraph login-subtitle">For new customers</Typography>
            <Typography style={style} className={`paragraph error ${isErrorEmail ? 'active' : ''}`}>User with email {userEmail} already exist!</Typography>
            <Typography style={style} className={`paragraph error ${isErrorPass ? 'active' : ''}`}>Password not matches!</Typography>
            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    password: "",
                    verifyPassword: "",
                }}
                onSubmit={(values) => createUserAccount(values)}
            >
                <Form className='registration'>
                    <Field id="fullName" name="fullName" placeholder="Full name" required/>
                    <Field id="email" name="email" placeholder="Email Address" required/>
                    <Field id="password" name="password" placeholder="Password" required/>
                    <Field id="verifyPassword" name="verifyPassword" placeholder="Verify password" required/>
                    <CustomButton className="btn btn__register" type="submit" text="Create account" />
                </Form>
            </Formik>
        </Box >
    )
}