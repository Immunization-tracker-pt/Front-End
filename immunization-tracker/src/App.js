import React from 'react';
import {Route} from 'react-router-dom';
import UserForm from './User/UserForm';
import NewUserForm from './User/NewUserForm';
import StaffForm from './Staff/StaffForm';
import Login from './User/Login';
import UserHomePage from './User/UserHomePage.js'; 
import './App.css';

function App() {
	return (
	<div className="App">
		<Route exact path ="/" component = {NewUserForm} /> {/*placeholding for landing page}*/}
		<Route path ="/userregister" component = {UserForm} />
		<Route path ="/providerregister" component = {StaffForm} />
		<Route path ='/register' render ={(props) => <UserForm {...props} />} />
		<Route path = "/home" component = {UserHomePage} />
		<Route path ="/login" component = {Login} />
	</div>
	); 
}

export default App;