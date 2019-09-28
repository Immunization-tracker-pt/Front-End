import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ChildForm = (p) => {
    const [children, setChildren] = useState ([]);
   
    let parentID = sessionStorage.getItem("id"); 
    useEffect (() => {
        // console.log("hi"); 
        // setChildren([1])
        axios.get("https://bw4-immunization.herokuapp.com/api/children")
        .then((res) => {
            console.log(res.data); 
           setChildren(res.data.filter( c => c.parent_id == parentID)); 
        })
    }, []
    )
   
    let {errors, touched} = p;
   
    let done = () => {
        p.history.push('/securehome')
    }
    return (
        <>
        <table class ='table'>
            <thead>
            <tr>
                <th scope ='col'>Full Name </th>
                <th scope ='col'>Date of Birth</th>
                
            </tr>
            </thead>
            <tbody>
            {children.map(c => 
                <tr key = {c.id}> 
                    
                    <td>
                        {c.fullname}
                    </td>
                    <td>
                        {c.dob}
                    </td>
                </tr>
            )}
        </tbody>
        </table>

        <div class="container">
		<div class="row justify-content-center">
		
		<Form class="col-lg-6">
		
            <h2>Dependents:</h2>


		{touched.fullname && errors.fullname && <p className ='error'>{errors.fullname} </p>}
		<p class='my-3'>Full Name</p>
        <Field type ="Text" className = 'form-control' name ="fullname" placeholder ="*Full Name" />


		{touched.dob && errors.dob && <p className ='error'>{errors.dob} </p>}
		<p class='my-3'>Date of Birth</p>
		<Field type ="date" className = 'form-control' name = "dob" placeholder ="*Month/Date/Year" />

        <Field type ="hidden" name = "parent_id" value = {parentID} />
        
        <button class = "btn btn-primary" type ="submit"> Add Dependents </button>
	
			

        </Form>
        </div>
        </div>

        <button onClick = {done}> DONE </button>
        </>
        ); 
        }

export default withFormik({
	mapPropsToValues : (values) => {
		return{

            fullname: values.fullname || "",
            dob: values.dob || "",
            parent_id: values.parent_id || "",
        }
    },
    validationSchema: yup.object().shape ({//2. implement form validation
	
        fullname: yup.string().required("Full Name is required!"),
        
		dob: yup.string().required("Date of Birth is required!"),

	
    }),
    handleSubmit: (values, { setSubmitting }) => {//value comes through to setter 
       //"https://bw4-immunization.herokuapp.com/api/parents/login"//3. how to POST rquest this url? 
       
       values.parent_id = sessionStorage.getItem('id')
       axios.post("https://bw4-immunization.herokuapp.com/api/children", values)
        .then((res) => {
            
           setSubmitting (false); 
           document.location.reload(); 
        })
        .catch((err) => {
            console.log("Error:", err)
        })
    }
})(ChildForm);

