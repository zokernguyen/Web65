import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./navbar.css";

const NavBar = () => {

    const [user, setUser] = useState();

    return (
        <nav className='navbar-container'>
            <Link to="/" className="navbar-home">Home</Link>
            {user ? (
                <>
                    <p className="navbar-user"></p>
                    <Link to="/logout" className="navbar-logout">Logout</Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="navbar-login">Login</Link>
                    <Link to="/register" className="navbar-register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;