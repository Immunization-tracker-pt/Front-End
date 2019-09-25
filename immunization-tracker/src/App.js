import React from 'react';
import {Route} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NavBar from './Visual/NavBar';
import UserForm from './User/UserForm';
import NewUserForm from './User/NewUserForm';
import StaffForm from './Staff/StaffForm';
import Login from './User/Login';
import UserHomePage from './User/UserHomePage.js'; 
import './App.css';

function App() {

	return (
	<div className="App">

		<Route path ="/" component={NavBar} />
		
		<div className="content-wrapper">
			<Route exact path ="/" component = {NewUserForm} /> {/*placeholding for landing page}*/}

			{/* Registration Routes */}
			<Route path ="/userregister" component = {UserForm} />
			<Route path ="/providerregister" component = {StaffForm} />

			{/* Login Routes */}
			<Route path ="/login" component = {Login} />
			<AuthRoute path = "/securehome" component = {UserHomePage} />

			{/* Generic User Homepage Route for development*/}
			<Route path = "/home" component = {UserHomePage} /> 
		</div>
	</div>
	); 
}

export default App;