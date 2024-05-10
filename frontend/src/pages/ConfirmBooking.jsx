import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import axios from 'axios';
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

function ConfirmBooking() {
  const [renterInfo, setRenterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    agreeToTerms: false,
    driverLicense: null,
  });

  const {carId} = useParams();
  console.log(carId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCarImage, setSelectedCarImage] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [phoneNumberDialog, setPhoneNumberDialog] = useState("");

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
    // Add your submission logic here, e.g., send data to server
    console.log(renterInfo);
  };

  const handleDialogOpen = (paymentMode, carImage) => {
    setSelectedPaymentMode(paymentMode);
    setSelectedCarImage(carImage);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePay = () => {
    // Add logic to handle payment
    console.log("Payment processed:", selectedPaymentMode, amount, remarks);
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
                    marginTop="-9020px"
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
                  <h
                    style={{
                      color: "#000433",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    Select Payment Mode
                  </h>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        boxShadow={2}
                        borderRadius={4}
                        border="0.5px solid #ccc"
                        p={2}
                        marginTop={3}
                        width={120}
                        height={120}
                        onClick={() =>
                          handleDialogOpen("Esewa", "../image/esewa.png")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="../image/esewa.png"
                          alt="Esewa"
                          style={{
                            width: "100px",
                            height: "auto",
                            marginTop: "25px",
                          }}
                        />
                        <Typography
                          variant="subtitle2"
                          style={{ marginTop: "10px" }}
                        >
                          ESEWA
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        boxShadow={2}
                        borderRadius={4}
                        border="0.5px solid #ccc"
                        p={2}
                        width={120}
                        marginTop={3}
                        height={120}
                        onClick={() =>
                          handleDialogOpen("Khalti", "../image/khalti.png")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="../image/khalti.png"
                          alt="Khalti"
                          style={{
                            width: "100px",
                            height: "auto",
                            marginTop: "25px",
                          }}
                        />
                        <Typography
                          variant="subtitle2"
                          style={{ marginTop: "10px" }}
                        >
                          KHALTI
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        boxShadow={2}
                        borderRadius={4}
                        border="0.5px solid #ccc"
                        p={2}
                        marginTop={3}
                        width={120}
                        height={120}
                        onClick={() =>
                          handleDialogOpen("E-Banking", "../image/e-bank.jpg")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="../image/e-bank.jpg"
                          alt="E-Banking"
                          style={{
                            width: "100px",
                            height: "auto",
                            marginTop: "10px",
                          }}
                        />
                        <Typography variant="subtitle2">EBANKING</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!renterInfo.agreeToTerms}
                    style={{ marginTop: 20 , backgroundColor:"Green", color:"white"}}
                  >
                    Confirm Booking
                  </Button>
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

      {/* Payment Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <img
            src={selectedCarImage}
            alt="Selected Car"
            style={{ width: "100px", height: "auto", marginBottom: 10 }}
          />
          <TextField
            fullWidth
            label="Phone number"
            value={phoneNumberDialog}
            onChange={(e) => setPhoneNumberDialog(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            style={{ marginBottom: 10 }}
          />
          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            style={{ marginBottom: 10 }}
          />
          <TextField
            fullWidth
            label="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            style={{ marginBottom: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePay}
            style={{ backgroundColor: "#61BB47", color: "white" }}
          >
            Pay
          </Button>
          <Button
            onClick={handleDialogClose}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmBooking;
