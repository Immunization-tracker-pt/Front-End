import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const UserForm = ({errors, touched, status}) => {
	console.log (status)
	const [users, setUsers] = useState ([])
	const [numDependents, setNumDependents] = useState (0)

    useEffect (()=> {
        if (status) {
        setUsers([...users, status])
        }
    }, [status])
    
    return (
		<Form>
            <h2>Dependents:</h2>
		<section className ="buttons">
			<div className ="addDependents">
				<button className ="addDependents" onClick ={(e)=> {
					setNumDependents(numDependents +1);
					e.preventDefault();
				}}>Add Dependents</button>
			</div>
			<div className ="removeDependents">
				<button className ="removeDependents" onClick ={(e)=> {
					setNumDependents(numDependents -1); 
					e.preventDefault();
				}}>Remove Dependents</button>
			</div>

		</section>

		{[...Array(numDependents).keys()].map(i => 
		<>
		{touched["ChildName"+i] && errors["ChildName" +i] && <p className ='error'>{errors["ChildName" +i]} </p>}
		<p>Child's Name</p>
        <Field type ="Text" name ={"ChildName"+i} placeholder ="*First Name and Last Name" />

		{touched["KidBirth" +i] && errors["KidBirth" +i] && <p className ='error'>{errors["KidBirth" +i]} </p>}
		<p>Child's Date of Birth</p>
		<Field type ="date" name ={"Child's Birthday"+i} placeholder ="*Month/Date/Year" />

		</>
		)}	

        </Form>
        ); 
        }

export default withFormik({
	mapPropsToValues : (values) => {
		return{

			ChildName: values.ChildName || "",
            KidBirth: values.KidBirth || "",
        }
    },
    validationSchema: yup.object().shape ({//2. implement form validation
	
		ChildName: yup.string().required("Child name is required!"),
		KidBirth: yup.string().required("Child's Birthday is required!"),

	
    }),
    handleSubmit: (values, { setStatus }) => {//value comes through to setter 
       //"https://bw4-immunization.herokuapp.com/api/parents/login"//3. how to POST rquest this url? 
       axios.post("https://reqres.in/api/users", values)
        .then((res) => {
           setStatus(res.data)
        })
        .catch((err) => {
            console.log("Error:", err)
        })
    }
})(UserForm);


