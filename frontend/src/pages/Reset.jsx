import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

function Reset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false); 
  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    Axios.post(`http://localhost:8000/auth/reset/${token}`, { password })
      .then((response) => {
        if (response.data.status) {
          setOpenDialog(true); 
        } else {
          setError("Failed to reset password. Please try again later.");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again later.");
        console.error(err);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
    navigate("/login"); 
  };

  return (
    <div className="background">
      <div className="reset">
        <div className="container">
          <h5>Reset your password</h5>
          <form className="password-form" onSubmit={handleSubmit}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-code"
                  label="Confirm password"
                  size="small"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirm(e.target.value)}
                  error={Boolean(error)}
                  helperText={error}
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
      {/* Dialog Box */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Password Changed Successfully</DialogTitle>
        <DialogContent>
          <p>Your password has been changed successfully.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Reset;
