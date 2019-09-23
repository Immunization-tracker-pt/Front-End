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
		<h2>Basic Contact Information</h2>
		{touched.FirstName && errors.FirstName && <p className ='error'>{errors.FirstName} </p>}
        
		<Field type ="text" name ="First Name" placeholder ="*First Name" />

		{touched.LastName && errors.LastName && <p className ='error'>{errors.LastName} </p>}
		
		<Field type ="text" name ="Last Name" placeholder ="*Last Name" />	
		
		{touched.Birth && errors.Birth && <p className ='error'>{errors.Birth} </p>}
		
		<Field type ="text" name ="Date of Birth" placeholder ="*Month/Date/Year" />	

		{touched.Gender && errors.Gender && <p className ='error'>{errors.Gender} </p>}
		
		<Field type ="text" name ="Gender" placeholder ="*Gender:F/M" />	

		<h2>Your Address</h2>
		{touched.Address && errors.Address && <p className ='error'>{errors.Address} </p>}
		
		<Field type ="text" name ="Address" placeholder ="*Address" />

		{touched.City && errors.City && <p className ='error'>{errors.City} </p>}
		
		<Field type ="text" name ="City" placeholder ="*City" />

		{touched.State && errors.State && <p className ='error'>{errors.State} </p>}
		
		<Field type ="text" name ="State/Province" placeholder ="*State/Province" />

		<h2>Contact Information</h2>
		{touched.Phonenumber && errors.Phonenumber && <p className ='error'>{errors.Phonenumber} </p>}
		
		<Field type ="text" name ="Phone Number" placeholder ="*Phone Number" />

		{touched.Email && errors.Email && <p className ='error'>{errors.Email} </p>}
		
        <Field type ="email" name ="Email Address (Primary)" placeholder ="*Email Address (Primary)" />

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
		<p>Child Name</p>
        <Field type ="Text" name ={"ChildName"+i} placeholder ="*First Name and Last Name" />

		{touched["KidBirth" +i] && errors["KidBirth" +i] && <p className ='error'>{errors["KidBirth" +i]} </p>}
		<p>Child's Birthday</p>
		<Field type ="text" name ={"Child's Birthday"+i} placeholder ="*Month/Date/Year" />

		{touched["KidGender" +i] && errors["KidGender" +i] && <p className ='error'>{errors["KidGender" +i]} </p>}
		<p>Gender</p>
		<Field type ="text" name ={"Kid'Gender"+1} placeholder ="*F/M" />
		</>
		)}	

		<h2>Set Username and Password</h2>
		{touched.UserName && errors.UserName && <p className ='error'>{errors.UserName} </p>}
		<p>Username</p>
        <Field type ="text" name ="Username" placeholder ="*Username" />
        
		{touched.Password && errors.Password && <p className ='error'>{errors.Password} </p>}
		<p>Password</p>
        <Field type ="password" name ="Password" placeholder ="*Password" />

		{touched.ConfirmPassword && errors.ConfirmPassword && <p className ='error'>{errors.ConfirmPassword} </p>}
        <p>Confirm Password</p>
		<Field type ="password" name ="Confirm Password" placeholder ="*Confirm Password" />
		

        {touched.Permission && errors.Permission && <p className ='error'>{errors.Permission} </p>}
		<p>Permission</p>
        <label>
        <Field type ="checkbox" name ="Permission"/>
        <span>I grant permission for an office staff to edit my immunization records. </span>
        </label>
		
        <button type ="submit"> + Sign Me Up </button>

   
        {users.map(user => (
            <div key={user.Email}>Name: {user.Name}</div>
        ))}
		</Form>
	);
};

export default withFormik({
	mapPropsToValues : (values) => {
		return{
			FirstName: values.FirstName || "", 
			LastName: values.LastName || "", 
			Birth: values.Birth || "",
			Gender: values.Gender || "",
			Address: values.Address || "",
			City: values.City || "",
			State: values.State || "",
			Phonenumber: values.Phonenumber || "",
			Email: values.Email || "",

			ChildName: values.ChildName || "",
			KidBirth: values.KidBirth || "",
			KidGender: values.KidGender || "",

			UserName: values.UserName || "",
            Password: values.Password ||"",
            Permission: values.Permission || false
        }
    },
    validationSchema: yup.object().shape ({//2. implement form validation
		FirstName: yup.string().required("First Name is required!"),
		LastName: yup.string().required("Last Name is required!"),
		Birth: yup.string().required("Date of Birth is required!"),
		Gender: yup.string().required("Gender is required!"),
		Address: yup.string().required("Address is required!"),
		City: yup.string().required("City is required!"),
		State: yup.string().required("State is required!"),
		Phonenumber: yup.string().required("Phone number is required!"),
		Email: yup.string().required("Email address is required!"),

		ChildName: yup.string().required("Child name is required!"),
		KidBirth: yup.string().required("Child's Birthday is required!"),
		KidGender: yup.string().required("KidGender is required!"),

		UserName: yup.string().required("Username is required!"),
        Password: yup.string().required("Password is required!"),
        Permission: yup.boolean().oneOf([true], "Must check the Permission")
    }),
    handleSubmit: (values, { setStatus }) => {//value comes through to setter 
       // "https://reqres.in/api/users"//3. how to POST rquest this url? 
       axios.post("https://reqres.in/api/users", values)
        .then((res) => {
           setStatus(res.data)
        })
        .catch((err) => {
            console.log("Error:", err)
        })
    }
})(UserForm);
