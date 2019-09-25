import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const UserForm = (props) => {
	// const [users, setUsers] = useState ([])
	// const [numDependents, setNumDependents] = useState (0)

    // useEffect (()=> {
    //     if (status) {
    //     setUsers([...users, status])
    //     }
    // }, [status])
    
	
	return (
		<Form>
		<h2>Basic Contact Information</h2>
		<p>Your Name: </p>
        
		<Field type ="text" name ="firstname" placeholder ="*First Name" />
		
		<Field type ="text" name ="lastname" placeholder ="*Last Name" />	
		
		<p>Date of Birth: </p>
		
		<Field type ="date" name ="dob" placeholder ="*Month/Date/Year" />	
	

		<p>Your Address</p>
		
		<Field type ="text" name ="street" placeholder ="*Street Address" />
		
		<Field type ="text" name ="city" placeholder ="*City" />
		
		<Field type ="text" name ="state_province" placeholder ="*State/Province" />

		<p>Contact Information</p>
		
		<Field type ="text" name ="phonenumber" placeholder ="*Phone Number" />

		<h2>Set Email Address and Password</h2>
		<p>Email Address</p>
        <Field type ="email" name ="email" placeholder ="*Email Address (Primary)" />

		<p>Password</p>
        <Field type ="password" name ="password" placeholder ="*Password" />

        <br></br>

        <Field type ="checkbox" name ="permission_granted" value="1" />
        <label htmlFor="permission_granted">
            <span>I grant permission for an office staff to edit my immunization records. </span>
        </label>
		
        <button type ="submit"> + Sign Me Up </button>

		</Form>
	);
};

export default withFormik({
	mapPropsToValues({firstname, lastname, dob, street, city, state_province, phonenumber, email, password}){
		return{
			firstname: firstname || "", 
			lastname: lastname || "", 
			dob: dob || "",
            
			street: street || "",
			city: city || "",
			state_province: state_province || "",
			phonenumber: phonenumber || "",
		
			email: email || "",
            password: password ||"",
        }
    },
    handleSubmit(values, FormikBag){
       axios.post("https://bw4-immunization.herokuapp.com/api/parents/register", values)
        .then((res) => {
            console.log('success', res);
            sessionStorage.setItem('token', res.data.token);
            FormikBag.props.history.push('/home')
            // Reroute to landing page
        })
        .catch((err) => {
            console.log("Error:", err);
            // Error message
        });
    }
})(UserForm);
