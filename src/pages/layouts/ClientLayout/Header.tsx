import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import logo from "../../../assets/icon/logo.png";
import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
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
            <a href="#home">Home</a>
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
            <Link to="/register">Register</Link>
          </li>
          <li className="box">
            <Link to="/login">Login</Link>
          </li>
          <li className="box flex items-center cursor-pointer">
            <Badge size="small" count={5}>
              <FontAwesomeIcon className="w-5 h-5" icon={faCartShopping} />
            </Badge>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
