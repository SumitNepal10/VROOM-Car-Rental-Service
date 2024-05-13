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

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    let isAdmin = email.endsWith("@admin.com");

    Axios.post("http://localhost:8000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          const { username } = response.data;

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", username);
          localStorage.setItem("isAdmin", isAdmin.toString());

          navigate("/");
        } else {
          setError("Login failed. Please check your email and password.");
        }
      })
      .catch((err) => {
        setError("An error occurred during login. Please try again.");
        console.error("Login error:", err);
      });
  };

  return (
    <div className="container">
      <div className="login">
        <div className="image">
          <img
            id="car"
            src="/image/car.jpg"
            style={{ height: "250px" }}
            alt="Car"
          />
        </div>
        <div className="content">
          <img
            id="logo"
            src="/image/logo.png"
            style={{ height: "80px" }}
            alt="Logo"
          />
          <h1 style={{ fontSize: "20px", color: "red" }}>
            Welcome aboard! Unlock your journey with us.
          </h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <Box sx={{ "& .MuiTextField-root": { m: 1, width: "300px" } }}>
              <div>
                <TextField
                  id="outlined-mail"
                  size="small"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="outlined-password-input"
                  size="small"
                  label="Password"
                  type="password"
                  value={password}
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
                fontSize: "16px",
                marginTop: "10px",
                color: "white",
                backgroundColor: "red",
              }}
              type="submit"
            >
              Login
            </Button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            <p className="switch" style={{ marginTop: "10px" }}>
              Don't have an account?
              <Link to="/sign-up" className="signup-switch" style={{ marginLeft: "5px" }}>
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
