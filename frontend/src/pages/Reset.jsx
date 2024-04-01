import React from "react";
import { TextField, Box, Button } from "@mui/material";

function Reset() {
  return (
    <div className="background">
      <div className="reset">
        <div className="container">
          <img
            id="pwd"
            style={{ width: "300px", marginTop: "-20px" }}
            src="image/pwd.png"
            
          />
          <h5>Reset your password</h5>
          <br />
          <form className="password-form">
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
                  label="New password"
                  type="password"
                />
              </div>
              <div>
                <TextField
                  id="outlined-code"
                  label="Confirm password"
                  size="small"
                  type="password"
                />
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
              Reset
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
