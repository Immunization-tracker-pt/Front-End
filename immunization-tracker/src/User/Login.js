import React from "react";
import auth from '../CustomMiddleware/auth';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


function Login(props) {
  return (
    <Form className="login-form">
      {props.location.state && props.location.state.incorrectCredentials && <h1 className="loginError">Incorrect Credentials</h1>}
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
        Object.keys(res.data).forEach(key => sessionStorage.setItem(key, JSON.stringify(res.data[key])));
        auth.login(
          () => FormikBag.props.history.push('/securehome')
        );
      })
      .catch(err => {console.log(err); FormikBag.props.history.push('/login',{incorrectCredentials: true})});
  }
})(Login);

export default FormikLogin;
