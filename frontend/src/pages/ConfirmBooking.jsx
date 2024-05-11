import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Checkbox,
  Button,
  Typography,
  Divider,
  FormControlLabel,
  Grid,
  Box,
  Container,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { Link } from "react-router-dom";

function ConfirmBooking() {
  const [renterInfo, setRenterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    agreeToTerms: false,
    driverLicense: null,
  });

  const { carId } = useParams();
  console.log(carId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCarImage, setSelectedCarImage] = useState("");

  const handleChange = (event) => {
    const { name, value, checked, files } = event.target;
    setRenterInfo((prevInfo) => ({
      ...prevInfo,
      [name]: name === "agreeToTerms" ? checked : files ? files[0] : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRenterInfo((prevInfo) => ({
      ...prevInfo,
      driverLicense: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(renterInfo);
  };

  const handleDialogOpen = (carImage) => {
    setSelectedCarImage(carImage);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid container justifyContent="center" spacing={3}>
          {/* Renter Information Card */}
          <Grid item xs={12} sm={6}>
            <Card variant="standard">
              <CardContent>
                <h
                  style={{
                    color: "#000433",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Renter Information
                </h>
                <Divider />
                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                  <h>First Name</h>
                  <TextField
                    fullWidth
                    name="firstName"
                    size="small"
                    value={renterInfo.firstName}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <br></br>
                  <h>Last Name</h>
                  <TextField
                    fullWidth
                    name="lastName"
                    size="small"
                    value={renterInfo.lastName}
                    onChange={handleChange}
                    required
                    margin="normal"
                    marginBottom="20px"
                  />
                  <h>Phone Number</h>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    size="small"
                    value={renterInfo.phoneNumber}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <br></br>
                  {/* File Upload for Driver's License */}
                  <h> Upload your driver's license</h>
                  <br></br>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    marginTop={2}
                    marginBottom={5}
                    borderRadius={4}
                    border="1.5px dashed"
                    borderColor="grey.500"
                    p={2}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="file"
                      name="driverLicense"
                      accept="image/*, application/pdf"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="driverLicenseInput"
                    />
                    <label htmlFor="driverLicenseInput">
                      <IconButton
                        color="primary"
                        component="span"
                        style={{ marginLeft: "50px" }}
                      >
                        <UploadFile />
                      </IconButton>
                      <Typography variant="body1" align="center">
                        Choose your file here
                      </Typography>
                    </label>
                  </Box>
                  <Link to="/Payment">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!renterInfo.agreeToTerms}
                      style={{
                        marginTop: 20,
                        backgroundColor: "Green",
                        color: "white",
                      }}
                    >
                      Pay now
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </Card>
          </Grid>
          {/* Partition Line */}
          <Divider
            orientation="vertical"
            flexItem
            style={{ margin: "0 20px" }}
          />
          {/* Terms and Conditions Card */}
          <Grid item xs={12} sm={5}>
            <Card variant="standard">
              <CardContent>
                <h
                  style={{
                    color: "#000433",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Terms and Conditions
                </h>
                <Divider />
                <Typography variant="body2">
                  By confirming this booking, you agree to the following terms
                  and conditions:
                </Typography>
                <ol style={{ paddingLeft: 20 }}>
                  <li>You must be at least 21 years old to rent a car.</li>
                  <li>
                    A valid driver's license and credit card in the renter's
                    name are required.
                  </li>
                  <li>
                    The rental period starts and ends at the agreed-upon dates
                    and times.
                  </li>
                  <li>
                    Any damage to the rental car during the rental period is the
                    renter's responsibility.
                  </li>
                </ol>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={renterInfo.agreeToTerms}
                      onChange={handleChange}
                      name="agreeToTerms"
                    />
                  }
                  label="I agree to the terms and conditions"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <img
            src={selectedCarImage}
            alt="Selected Car"
            style={{ width: "100px", height: "auto", marginBottom: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmBooking;
