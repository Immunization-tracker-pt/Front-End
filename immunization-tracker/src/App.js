import React, {useState} from 'react';
import { Route } from 'react-router-dom'; 
import UserForm from './User/UserForm';

import UserHomePage from './User/UserHomePage.js'; 

import './App.css';

function App() {
	const [token, setToken] = useState (); 

	return (
	<main> 

	<Route
		path ='/register'
		render ={(props) => <UserForm {...props} setToken={setToken} />} //use props instead of component, settoken to give the userform
	/>

	<Route path = "/home" component = {UserHomePage} />

	</main>
	); 
}

export default App;
