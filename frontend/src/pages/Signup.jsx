import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (email === "" || username === "" || password === "" || phone === "") {
      setError("Fill All the Details");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      setError("Only Gmail accounts are allowed.");
      return;
    }

    if (username === "Admin") {
      setError("Username cannot be Admin. Choose another name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/^\d{10}$/.test(phone) || !phone.startsWith("98")) {
      setError("Phone number must be 10 digits and start with '98'.");
      return;
    }

    Axios.post("http://localhost:8000/auth/signup", {
      username,
      email,
      password,
      phone,
    })
      .then((response) => {
        if (response.data.status) {
          toast.success("Signup Successful!");

          // Wait for 2 seconds before navigating
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          setError("Username or email already exists");
        }
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="background">
      <div className="login" onSubmit={handleSubmit}>
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
            style={{ height: "80px", marginTop: "13px" }}
            alt="Logo"
          />
          <h1 style={{ fontSize: "13px", color: "red", marginTop: "-10px" }}>
            Welcome aboard! Unlock your journey with us
          </h1>
          <form className="signup-form">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "300px" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <div>
                  <TextField
                    id="outlined-name"
                    size="small"
                    label="Name"
                    type="text"
                    required=""
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-mail"
                    size="small"
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div>
                    <TextField
                      id="outlined-phone-number"
                      label="Phone Number"
                      size="small"
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Box>
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
              Sign up
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ToastContainer position="bottom-center" />
            <p className="switch">
              Already have an account?
              <Link to="/login" className="signup-switch">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
