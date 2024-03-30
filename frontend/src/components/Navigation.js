import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <header>
      <Link to="/" className="logo">
        <img src="image/logo.png" alt="logo" />
      </Link>
      <div className="bx bx-menu" id="menu-icon" />
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#vehicles">Vehicles</a>
        </li>
        <li>
          <a href="#ride">Ride</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="header-btn">
        <Link to="sign-up" className="sign-up">
          Sign Up
        </Link>
        <Link to="login" className="sign-in">
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Navigation;
