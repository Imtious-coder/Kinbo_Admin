/* eslint-disable no-unused-vars */
import React from "react";
import "../Styles/Navbar.css";
import navLogo from "../assets/nav-logo.svg";
import profileImage from "../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="nav-logo" src={navLogo} alt="Logo" />
      <img className="nav-profile" src={profileImage} alt="Profile Picture" />
    </nav>
  );
};

export default Navbar;
