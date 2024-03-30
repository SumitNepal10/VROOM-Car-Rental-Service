import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="login">
      <div className="image">
        <img id="car" src="image/car.jpg" />
      </div>
      <div className="container">
        <img id="logo" src="image/logo.png" />
        <h1>Welcome aboard! Unlock your journey with us</h1>
        <form className="signup-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required=""
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required=""
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required=""
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="phone"
              name="number"
              placeholder="Enter your phone number"
              required=""
            />
          </div>
          <button id="signup" type="submit">
            Sign Up
          </button>
          <br />
          <br />
          <p1> Already have an account? </p1>
          <p2>
            {" "}
            <Link to="/login">Login</Link>
          </p2>
        </form>
      </div>
    </div>
  );
}

export default Signup;
