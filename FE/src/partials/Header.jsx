// Header.jsx
import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

import logo from "./../assets/icon/logo.png";

function Header() {
    return (
        <div className="Header">
            <nav className="navbar">
                <div className="logo-container">
                    <a href="#">
                        <img src={logo} alt="Logo" className="logo-img" />
                    </a>
                </div>
                <ul className="nav">
                    <li className="box">
                        <a href="#home" >Home</a>
                    </li>
                    <li className="box">
                        <a href="#about">About</a>
                    </li>

                    <li className="box">
                        <a href="#menu">Menu</a>
                    </li>

                    <li className="box">
                        <a href="#booking">Booking</a>
                    </li>

                    <li className="box">
                        <Link to='/register'>Register</Link>
                    </li>

                    <li className="box">
                        <Link to='/login'>Login</Link>
                    </li>                    
                </ul>
            </nav>
        </div>
    );
}

export default Header;
