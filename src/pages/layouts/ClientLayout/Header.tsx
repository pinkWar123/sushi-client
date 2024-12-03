import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import logo from "../../../assets/icon/logo.png";
import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../hooks/redux";
import CartModal from "./CartModal";
import { PATH } from "../../../constants/paths";

const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const selectedDishes = useAppSelector(
    (state) => state.clientSections.selectedDishes
  );
  const { name, branchId, employeeId } = useAppSelector(
    (state) => state.account
  );
  console.log(name);
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
          {!name && (
            <li className="box">
              <Link to="/register">Register</Link>
            </li>
          )}
          {!name && (
            <li className="box">
              <Link to="/login">Login</Link>
            </li>
          )}
          {name && <strong>Welcome {name} !</strong>}
          <li
            className="box flex items-center cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            <Badge size="small" count={selectedDishes.length}>
              <FontAwesomeIcon className="w-5 h-5" icon={faCartShopping} />
            </Badge>
          </li>
          {employeeId && branchId && (
            <a href={`/${branchId}/dashboard` + PATH.DASHBOARD.outlet.index}>
              <strong>Go to dashboard page</strong>
            </a>
          )}
        </ul>
      </nav>
      {openModal && <CartModal onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default Header;
