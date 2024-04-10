import React from "react";
import { TextField, Button } from "@mui/material";

function HeroForm() {
  return (
    <div className="form-container">
      <form action="">
        <div className="input-box">
          <TextField
            id="outlined-pickup-location"
            label="Pick up Location"
            type="search"
            placeholder="Search Places"
            variant="outlined"
            size="small"
            sx={{ width: "270px",
          marginRight:"20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="input-box">
          <TextField
            id="outlined-dropoff-location"
            label="Drop-off Location"
            type="search"
            placeholder="Search Places"
            variant="outlined"
            size="small"
            sx={{ width: "270px",
            marginRight:"20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="input-box">
          <TextField
            id="outlined-pickup-date"
            label="Pick-up Date"
            type="date"
            variant="outlined"
            size="small"
            sx={{ width: "270px",
            marginRight:"20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="input-box">
          <TextField
            id="outlined-dropoff-date"
            label="Drop-off Date"
            type="date"
            variant="outlined"
            size="small"
            sx={{ width: "270px",
            marginRight:"20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <br />
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
              Find a Vehicle
            </Button>
      </form>
    </div>
  );
}

export default HeroForm;
