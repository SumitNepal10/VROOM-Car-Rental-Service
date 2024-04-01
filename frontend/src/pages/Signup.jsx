import React from "react";
import { TextField, Box, Button } from "@mui/material";

import { Link } from "react-router-dom";

function Signup() {
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
            style={{ height: "80px", marginTop:"13px" }}
            alt="Logo"
          />
          <h1 style={{ fontSize: "13px", color: "red" , marginTop:"-10px"}}>
            Welcome aboard! Unlock your journey with us
          </h1>
          <form className="signup-form">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "300px"},
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
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-mail"
                    size="small"
                    label="Email"
                    type="email"
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    size="small"
                    type="password"
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-phone-number"
                    label="Phone Number"
                    size="small"
                    type="text"
                  />
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
                // '&:hover': {
                //   backgroundColor: 'grey',
                // },
              }}
              type="submit"
            >
               Sign up
            </Button>
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
