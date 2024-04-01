import React from "react";
import { TextField, Box, Button } from "@mui/material";

function Verification() {
  return (
    <div className="background">
      <div className="reset">
        <Box
          component="form"
          className="forgotpwd-form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "300px" },
          }}
          noValidate
          autoComplete="off"
        >
          <h>Enter the verification code </h>
          <div>
            <TextField id="outlined-code" size="small" type="text" />
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
