import React from "react";
import { TextField, Button} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function HeroForm() {
  const steps = [
    "Choose your favorite car",
    "Pickup location and date",
    "Make a booking",
    "Sit back and relax",
  ];
  const descriptions = [
    "Select your favorite car from the endless options in our car inventory.",
    "Select your location for pick-up and drop-off to start your journey.",
    "Make easy bookings from our website by providing necessary details.",
    "Your booking is confirmed! Sit back and relax until your pickup date.",
  ];

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
            sx={{ width: "270px", marginRight: "20px" }}
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
            sx={{ width: "270px", marginRight: "20px" }}
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
            sx={{ width: "270px", marginRight: "20px" }}
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
            sx={{ width: "270px", marginRight: "20px" }}
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
      <div className="step">
        <Stepper
          sx={{
            "& .MuiStepIcon-root": {
              color: "red",
              fontSize: "2rem",
            },
            "& .MuiStepLabel-root": {
              marginTop: "50px",
              textAlign:"left"
            },
            "& .MuiStepConnector-line": {
              borderColor: "red",
              marginTop: "50px",
            },
          }}
          alternativeLabel
        >
          {steps.map((label, index) => (
            <Step key={label} completed={index < 4} >
              <StepLabel
                StepIconProps={{
                  style: { color: "red" },
                }}
              >
                <div>
                  {label}
                  {descriptions[index]  && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "gray",
                        margin: "5px 0 0 0",
                      }}
                    >
                      {descriptions[index]}
                    </p>
                  )}
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}

export default HeroForm;
