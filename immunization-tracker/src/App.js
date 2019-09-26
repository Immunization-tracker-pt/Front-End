import React from 'react';
import {Route} from 'react-router-dom';
import AuthRoute from './CustomMiddleware/AuthRoute';
import NavBar from './Visual/NavBar';
import UserForm from './User/UserForm';
import NewUserForm from './User/NewUserForm';
import StaffForm from './Staff/StaffForm';
import Login from './User/Login';
import Logout from './User/Logout'
import UserHomePage from './User/UserHomePage.js';
import UserLanding from './User/newUserHomePage';
import './App.css';

function App() {

	return (
	<div className="App">
		{/* NavBar */}
		<Route path ="/" component={NavBar} />

		<div className="content-wrapper">

			{/*placeholding for landing page}*/}
			<Route exact path ="/" component = {NewUserForm} />

			{/* Registration Routes */}
			<Route path ="/userregister" component = {UserForm} />
			<Route path ="/providerregister" component = {StaffForm} />

			{/* Login Routes */}
			<Route path ="/login" component = {Login} />
			<Route path ="/logout" component = {Logout} />
			<AuthRoute path = "/securehome" component = {UserLanding} altPath = '/login' />

			{/* Generic User Homepage Route for development*/}
			<Route path = "/home" component = {UserHomePage} /> 
		</div>
	</div>
	); 
}

export default App;