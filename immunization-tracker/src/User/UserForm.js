import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

let parents = [{
    "id": 1,
    "username": "testfamily",
    "email": "test@test.com",
    "password": "test",
    "firstname": "Jack",
    "middlename": "Alex",
    "lastname": "Smith",
    "dob": "1980-09-19T21:01:23.369Z",
    "gender": "male",
    "street": "125 Address Way",
    "street2": null,
    "city": "A Big City",
    "state_province": "California",
    "phonenumber": "555-555-1234"
  }];

const UserForm = ({errors, touched}) => {
	
	return (
		<Form>
		<h2>Basic Contact Information</h2>
		<p>Your Name: </p>
		{touched.firstname && errors.firstname && <p className ='error'>{errors.firstname} </p>}
        
		<Field type ="text" name ="firstname" placeholder ="*First Name" />

		{touched.lastname && errors.lastname && <p className ='error'>{errors.lastname} </p>}
		
		<Field type ="text" name ="lastname" placeholder ="*Last Name" />	
		
		<p>Date of Birth: </p>
		{touched.dob && errors.dob && <p className ='error'>{errors.dob} </p>}
		
		<Field type ="date" name ="dob" placeholder ="*Month/Date/Year" />	
	

		<p>Your Address</p>
		{touched.street && errors.street && <p className ='error'>{errors.street} </p>}
		
		<Field type ="text" name ="street" placeholder ="*Address" />

		{touched.city && errors.city && <p className ='error'>{errors.city} </p>}
		
		<Field type ="text" name ="city" placeholder ="*City" />

		{touched.state_province && errors.state_province && <p className ='error'>{errors.state_province} </p>}
		
		<Field type ="text" name ="state_province" placeholder ="*State/Province" />

		<p>Contact Information</p>
		{touched.phonenumber && errors.phonenumber && <p className ='error'>{errors.phonenumber} </p>}
		
		<Field type ="text" name ="phonenumber" placeholder ="*Phone Number" />

		
		<h2>Set Email Address and Password</h2>
		{touched.email && errors.email && <p className ='error'>{errors.email} </p>}
		<p>Email Address</p>
        <Field type ="email" name ="email" placeholder ="*Email Address (Primary)" />

		{touched.password && errors.password && <p className ='error'>{errors.password} </p>}
		<p>Password</p>
        <Field type ="password" name ="password" placeholder ="*Password" />


        {touched.permission_granted && errors.permission_granted && <p className ='error'>{errors.permission_granted} </p>}
		<h2>Permission</h2>
        <label>
        <Field type ="checkbox" name ="permission_granted"/>
        <span>I grant permission for an office staff to edit my immunization records. </span>
        </label>
		
        <button type ="submit"> + Sign Me Up </button>


		</Form>
	);
};

export default withFormik({
	mapPropsToValues : (values) => {
		return{
			firstname: values.firstname || "", 
			lastname: values.lastname || "", 
			dob: values.dob || "",
			
			street: values.street || "",
			city: values.city || "",
			state_province: values.state_province || "",
			phonenumber: values.phonenumber || "",
			
		
			email: values.email || "",
            password: values.password ||"",
            permission_granted: values.permission_granted || false
        }
    },
    validationSchema: yup.object().shape ({//2. implement form validation
		firstname: yup.string().required("First Name is required!"),
		lastname: yup.string().required("Last Name is required!"),
		dob: yup.string().required("Date of Birth is required!"),
		
		street: yup.string().required("Address is required!"),
		city: yup.string().required("City is required!"),
		state_province: yup.string().required("State is required!"),
		phonenumber: yup.string().required("Phone number is required!"),
	

		email: yup.string().required("Email address is required!"),
        password: yup.string().required("Password is required!"),
        permission_granted: yup.boolean().oneOf([true], "Must check the Permission")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {//value comes through to setter 
       //"https://bw4-immunization.herokuapp.com/api/parents/login"//3. how to POST rquest this url? 
       axios.post("https://bw4-immunization.herokuapp.com/api/parents/register", values)
        .then((res) => {
			console.log(res)
			//debugger;
			props.setToken(res.data.token); 
			window.location.href = new URL(window.location.href).origin + "/home"; 
			setSubmitting(false); 
           //setStatus(res.data)
        })
        .catch((err) => {
            console.log("Error:", err)
        })
    }
})(UserForm);