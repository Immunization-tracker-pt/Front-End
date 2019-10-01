import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	rootElement,
);

// Navbar

const mobileAccordion = document.querySelector('.mobile-nav');
const menu = document.querySelector('#top-nav');
const menuState = () => menu.style.visibility;

mobileAccordion.addEventListener('click', () => {
    return !menuState() || menuState() === "hidden" ? menu.style.visibility = "visible" : menu.style.visibility = "hidden";
});


document.querySelector('.content-wrapper').addEventListener('click', () => {
	if(window.innerWidth < 1000)
		if(!menuState() || menuState() === 'visible') menu.style.visibility = "hidden";
	return;
});

window.addEventListener('resize', () => window.innerWidth >= 1000 ? menu.style.visibility = 'visible' : menu.style.visibility = 'hidden');