import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/vaxandtrack.png';
// import menuIcon from '../images/iconfinder_menu-alt_134216.png';

function NavBar(){
    const dynamicAuthRoute = () => sessionStorage.token !== undefined ? 'Logout' : 'Login';
    return(
        <section className="nav-container flex-container">
        <nav>
            <img src={logo} />
            <div className="mobile-nav"><i className="fa fa-bars"></i></div>
            <ul id="top-nav">
                <li><NavLink to="/securehome">Home</NavLink></li>
                <li><a href="https://vaxandtrack.netlify.com/about.html">About Us</a></li>
                <li><NavLink to="/userregister">Sign-up</NavLink></li>
                <li><NavLink to={`/${dynamicAuthRoute()}`}>{dynamicAuthRoute()}</NavLink></li>
            </ul>
        </nav>
    </section>
    )
}

export default NavBar;