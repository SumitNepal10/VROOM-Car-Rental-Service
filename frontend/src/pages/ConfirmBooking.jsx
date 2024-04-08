import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  Card,
  CardContent,
  TextField,
  Checkbox,
  Button,
  Typography,
  Divider,
  FormControlLabel,
} from "@mui/material";

function ConfirmBooking() {
  const [renterInfo, setRenterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    agreeToTerms: false,
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setRenterInfo((prevInfo) => ({
      ...prevInfo,
      [name]: name === "agreeToTerms" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submission logic here, e.g., send data to server
    console.log(renterInfo);
  };

  return (
    <>
      <Navigation />
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginTop: 20,
          marginLeft: 50,
        }}
      >
        <Card variant="outlined" style={{ width: 400 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontSize: "15px" }}>
              Renter Information
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                size="small"
                value={renterInfo.firstName}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                size="small"
                value={renterInfo.lastName}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                size="small"
                value={renterInfo.email}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                size="small"
                value={renterInfo.phoneNumber}
                onChange={handleChange}
                required
                margin="normal"
              />
              {/* <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!renterInfo.agreeToTerms} // Disable submit button if terms not agreed
                style={{ marginTop: 20 }}
              >
                Confirm Booking
              </Button> */}
            </form>
          </CardContent>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginTop: 20,
          marginLeft: 50,
        }}
      >
        <Card variant="outlined" style={{ width: 400 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontSize: "15px" }}>
              Terms and Conditions
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            {/* Example terms and conditions */}
            <Typography sx={{ fontSize: "13px" }}>
              By confirming this booking, you agree to the following terms and
              conditions: <br></br>1. You must be at least 21 years old to rent
              a car.<br></br> 2. A valid driver's license and credit card in the
              renter's name are required.<br></br> 3. The rental period starts
              and ends at the agreed-upon dates and times.<br></br> 4. Any
              damage to the rental car during the rental period is the renter's
              responsibility. Please review the full terms and conditions before
              proceeding with the booking.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={renterInfo.agreeToTerms}
                  onChange={handleChange}
                  name="agreeToTerms"
                />
              }
              label="I agree to the terms and conditions"
              sx={{ fontSize: "10px" }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ConfirmBooking;
