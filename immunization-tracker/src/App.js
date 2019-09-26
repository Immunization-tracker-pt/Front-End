import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NavBar from './Visual/NavBar';
import UserForm from './User/UserForm';
import NewUserForm from './User/NewUserForm';
import StaffForm from './Staff/StaffForm';
import Login from './User/Login';
import Logout from './User/Logout'
import UserHomePage from './User/UserHomePage.js';
import './App.css';
import ChildForm from './User/ChildForm.js'; 

function App() {
	const [parentID, setParentID] = useState ();

	return (
	<div className="App">
		{/* NavBar */}
		<Route path ="/" component={NavBar} />

		<div className="content-wrapper">
			<Route exact path ="/" component = {NewUserForm} /> {/*placeholding for landing page}*/}

			{/* Registration Routes */}
		

			<Route path='/userregister'
               render ={(props) => <UserForm {...props} setParentID={setParentID} />} 
       />
	   <Route path = "/child" 
              render ={(props)=> <ChildForm {...props} parentID = {parentID} />} 
              />

			<Route path ="/providerregister" component = {StaffForm} />

			{/* Login Routes */}
			<Route path ="/login" component = {Login} />
			<Route path ="/logout" component = {Logout} />
			<AuthRoute path = "/securehome" component = {UserHomePage} altPath = '/login' />

			{/* Generic User Homepage Route for development*/}
			<Route path = "/home" component = {UserHomePage} /> 
		</div>
	</div>
	); 
}

export default App;