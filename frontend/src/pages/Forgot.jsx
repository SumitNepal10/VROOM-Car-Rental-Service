import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Forgot() {
  return (
    <div className="background">
      <div className="reset">
        <div className="container">
          <img
            id="resetpwd"
            style={{ height: "300px", marginTop: "-50px" }}
            src="image/reset.png"
          />
          <h1 style={{color:"red",fontSize: "15px", marginTop: "-50px" }}>
            Forgot your password?
          </h1>
          <br />
          <p style={{ fontSize: "13px", marginTop: "-20px" }}>
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <Box
            component="form"
            className="forgotpwd-form"
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
              />
            </div>
            {/* <div>
              <TextField
                id="outlined-code"
                label="Verification Code"
                size="small"
                type="text"
              />
            </div> */}
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
              Reset
            </Button>
          <p className="switch">
            Return to{" "}
            <Link to="/login" className="signup-switch">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
