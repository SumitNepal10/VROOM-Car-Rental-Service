import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function HeroForm() {
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropOffLocation: "",
    pickupDate: "",
    dropOffDate: "",
  });

  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const currentDate = new Date().toISOString().split("T")[0];

    if (id === "pickupDate" && value < currentDate) {
      setError("Pickup date cannot be in the past.");
      setOpenDialog(true);
    } else if (id === "dropOffDate" && value < formData.pickupDate) {
      setError("Drop-off date cannot be before the pickup date.");
      setOpenDialog(true);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        setError(
          `Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        setOpenDialog(true);
        return;
      }
    }
    navigate("/BookCar", { state: { formData } });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <TextField
            id="pickupLocation"
            label="Pick up Location"
            type="search"
            placeholder="Search Places"
            variant="outlined"
            size="small"
            sx={{ width: "270px", marginRight: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.pickupLocation}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <TextField
            id="dropOffLocation"
            label="Drop-off Location"
            type="search"
            placeholder="Search Places"
            variant="outlined"
            size="small"
            sx={{ width: "270px", marginRight: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.dropOffLocation}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <TextField
            id="pickupDate"
            label="Pick-up Date"
            type="date"
            variant="outlined"
            size="small"
            sx={{ width: "270px", marginRight: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.pickupDate}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <TextField
            id="dropOffDate"
            label="Drop-off Date"
            type="date"
            variant="outlined"
            size="small"
            sx={{ width: "270px", marginRight: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.dropOffDate}
            onChange={handleChange}
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
              textAlign: "left",
            },
            "& .MuiStepConnector-line": {
              borderColor: "red",
              marginTop: "50px",
            },
          }}
          alternativeLabel
        >
          {steps.map((label, index) => (
            <Step key={label} completed={index < 4}>
              <StepLabel
                StepIconProps={{
                  style: { color: "red" },
                }}
              >
                <div>
                  {label}
                  {descriptions[index] && (
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

      {/* Error Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HeroForm;
