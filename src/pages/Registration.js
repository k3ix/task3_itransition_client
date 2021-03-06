import React from 'react';
import {Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios'
import { useHistory } from "react-router-dom";


const Registration = () => {
    let history = useHistory();

    const initialValues = {
        email:"",
        username:"",
        password:"",
    }

    const onSubmit = (data) => {
        axios.post("https://task3-itransition.herokuapp.com/users/register", data).then((response) => {
            history.push("/login");
        })
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Wrong input").required("E-Mail is required."),
        username: Yup.string().required("Username is required."),
        password: Yup.string().required("Password is required."),
    });

    return (
        <div>
            <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
                <Form className="registerForm">
                    <ErrorMessage name="email" component="span"/>
                    <Field
                        autoComplete="off"
                        id="registerFormField"
                        name="email"
                        placeholder="Enter your e-mail" />
                    <ErrorMessage name="username" component="span"/>
                    <Field
                        autoComplete="off"
                        id="registerFormField"
                        name="username"
                        placeholder="Enter username" />
                    <ErrorMessage name="password" component="span"/>
                    <Field
                        autoComplete="off"
                        type="password"
                        id="registerFormField"
                        name="password"
                        placeholder="Password"/>
                    <button type="submit" className="logregbtn">Register</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Registration;