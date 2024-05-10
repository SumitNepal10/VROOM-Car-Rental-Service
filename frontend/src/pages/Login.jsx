import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          const { username } = response.data;
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("username", username);
          if (email.endsWith("@admin.com")) {
            localStorage.setItem("isAdmin", true);
          }
          navigate("/");
        } else {
          setError("Login failed. Please check your email and password.");
        }
      })
      .catch((err) => {
        setError("An error occurred during login. Please try again.");
        console.log(err);
      });
  };

  return (
    <div className="background">
      <div className="login">
        <div className="image">
          <img
            id="car"
            src="image/car.jpg"
            style={{ height: "250px" }}
            alt="Car"
          />
        </div>
        <div className="container">
          <img
            id="logo"
            src="image/logo.png"
            style={{ height: "80px" }}
            alt="Logo"
          />
          <h1 style={{ fontSize: "13px", color: "red", marginTop: "-10px" }}>
            Welcome aboard! Unlock your journey with us
          </h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "300px" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-mail"
                  size="small"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  size="small"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Box>
            <p>
              <Link to="/forgot" className="forgot-link">
                Forgot your password?
              </Link>
            </p>
            <Button
              variant="contained"
              sx={{
                fontSize: "13px",
                marginTop: "10px",
                color: "white",
                backgroundColor: "red",
              }}
              type="submit"
            >
              Login
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p className="switch">
              Don't have an account?
              <Link to="/sign-up" className="signup-switch">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
