import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    Axios.post("http://localhost:8000/auth/forgot", { email })
      .then((response) => {
        if (response.data.status) {
          alert("Check your email for the reset password link");
          navigate("/login");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again later.");
        console.error(err);
      });
  };
  
  return (
    <div className="background">
      <form className="reset" onSubmit={handleSubmit}>
        <div className="container">
          <img
            id="resetpwd"
            style={{ height: "300px", marginTop: "-50px" }}
            src="image/reset.png"
            alt="Reset Password"
          />
          <h1 style={{ color: "red", fontSize: "15px", marginTop: "-50px" }}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
                helperText={error}
              />
            </div>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontSize: "13px",
              marginTop: "10px",
              color: "white",
              backgroundColor: "red",
            }}
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
      </form>
    </div>
  );
}

export default Forgot;
