import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import logo from "../../../assets/icon/logo.png";
import { Badge, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import CartModal from "./CartModal";
import { PATH } from "../../../constants/paths";
import { logOut } from "../../../redux/accountSlice";

const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const selectedDishes = useAppSelector(
    (state) => state.clientSections.selectedDishes
  );
  const { name, branchId, employeeId } = useAppSelector(
    (state) => state.account
  );
  const dispatch = useAppDispatch();

  const isAuthenticated = () => {
    if (name || branchId || employeeId) return true;
    return false;
  };

  const handleLogOut = () => {
    dispatch(logOut());
    message.success("Log out completed");
  };

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
          {!isAuthenticated() && (
            <li className="box">
              <Link to="/register">Register</Link>
            </li>
          )}
          {!isAuthenticated() && (
            <li className="box">
              <Link to="/login">Login</Link>
            </li>
          )}
          {isAuthenticated() && (
            <li className="box">
              <Link to={"#"} onClick={handleLogOut}>
                Logout
              </Link>
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
