import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Login(props) {
  return (
    <Form>
      {props.incorrectCredentials && <h1 className="loginError">Incorrect Credentials</h1>}
      <h1>Login</h1>

        <div className="loginError">
          {props.errors.email && <h3>{props.errors.email}</h3>}
        </div>

      <Field type="text" name="email" placeholder="Email" />

        <div className="loginError">
          {props.errors.password && <h3>{props.errors.password}</h3>}
        </div>

      <Field type="password" name="password" placeholder="Password" />

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

  handleSubmit(loginData) {
    axios
      .post(
        "https://bw4-immunization.herokuapp.com/api/parents/login",
        loginData
      )
      .then(res => {
        console.log(JSON.stringify(res.status));
      })
      .catch(err => console.log(err, '!!!'))
  }
})(Login);

export default FormikLogin;
