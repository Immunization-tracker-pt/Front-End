import React, { useState, useEffect } from "react";
import {Route} from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


function Login(props) {
  return (
    <Form>
      {props.location.state && <h1 className="loginError">Incorrect Credentials</h1>}
      <h1>Login</h1>

        <div className="loginError">
          {props.touched.email && props.errors.email && <h3>{props.errors.email}</h3>}
        </div>

      <Field type="text" name="email" placeholder="Email" />

        <div className="loginError">
          {props.touched.password && props.errors.password && <h3>{props.errors.password}</h3>}
        </div>

      <Field type="password" name="password" placeholder="Password" />
      <br></br>
      <button type="submit">Submit</button>
    </Form>
  );
}

const FormikLogin = withFormik({
  manPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
  }),

  handleSubmit(loginData, FormikBag) {
    axios
      .post(
        "https://bw4-immunization.herokuapp.com/api/parents/login",
        loginData
      )
      .then(res => {
        console.log(JSON.stringify(res));
        sessionStorage.setItem('token', res.data.token);
        FormikBag.props.history.push('/home');
      })
      .catch(err => FormikBag.props.history.push('/login',{incorrectCredentials: true}));
  }
})(Login);

export default FormikLogin;
