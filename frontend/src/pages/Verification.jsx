import React from "react";
import { TextField, Box, Button } from "@mui/material";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Verification() {
  const [code, setCode] = useState("");
  console.log(code)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:8000/auth/verification`, {
      code,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/reset");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="background">
      <div className="reset" onSubmit={handleSubmit}>
        <Box
          component="form"
          className="forgotpwd-form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "300px" },
          }}
          noValidate
          autoComplete="off"
        >
          <h style={{ fontWeight: "bold", fontSize: "larger" }}>
            Verification code{" "}
          </h>
          <p>Enter the verification code that we sent through your email.</p>
          <div>
            <TextField
              id="outlined-code"
              size="small"
              type="text"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
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
        </Box>
      </div>
    </div>
  );
}

export default Verification;
