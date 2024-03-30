import React from "react";
import { Link } from "react-router-dom";

function Login() {
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
          <p>
            <Link to="/forgot">Forgot your password?</Link>
            <br></br>
          </p>
          <button id="signup" type="submit">
            Log in
          </button>
          <br />
          <br />
          <p1> Don't have an account? </p1>
          <p2>
            {" "}
            <Link to="/sign-up">Sign Up</Link>
          </p2>
        </form>
      </div>
    </div>
  );
}

export default Login;
