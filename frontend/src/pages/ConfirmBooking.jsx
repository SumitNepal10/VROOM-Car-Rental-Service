import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import axios from "axios"; // Importing axios
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
    phone: "",
    agreeToTerms: false,
    driverLicense: null,
  });

  const { carId } = useParams(); // Retrieving carId from route parameters

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("carId", carId);
    formData.append("firstName", renterInfo.firstName);
    formData.append("lastName", renterInfo.lastName);
    formData.append("email", renterInfo.email);
    formData.append("phone", renterInfo.phone);
    formData.append("driverLicense", renterInfo.driverLicense);

    try {
      const response = await axios.post(
        "http://localhost:8000/renter/newRenter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
    // Implement payment logic here
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
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Renter Information</Typography>
                <Divider />
                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    name="firstName"
                    size="small"
                    label="First Name"
                    value={renterInfo.firstName}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    name="lastName"
                    size="small"
                    label="Last Name"
                    value={renterInfo.lastName}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    name="phone"
                    size="small"
                    label="Phone Number"
                    value={renterInfo.phone}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    name="email"
                    size="small"
                    label="Email"
                    value={renterInfo.email}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  {/* File Upload for Driver's License */}
                  <Typography variant="body1" style={{ marginTop: 10 }}>
                    Upload your driver's license
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
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
                      <IconButton color="primary" component="span">
                        <UploadFile />
                      </IconButton>
                      <Typography variant="body1" align="center">
                        Choose your file here
                      </Typography>
                    </label>
                  </Box>

                  {/* Select Payment Mode */}
                  <Typography variant="h5" style={{ marginTop: 20 }}>
                    Select Payment Mode
                  </Typography>
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
                          handleDialogOpen("Esewa", "/image/esewa.png")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="/image/esewa.png"
                          alt="Esewa"
                          style={{
                            width: "100px",
                            height: "auto",
                            marginTop: "25px",
                          }}
                        />
                        <Typography variant="subtitle2">ESEWA</Typography>
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
                          handleDialogOpen("Khalti", "/image/khalti.png")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="/image/khalti.png"
                          alt="Khalti"
                          style={{
                            width: "100px",
                            height: "auto",
                            marginTop: "25px",
                          }}
                        />
                        <Typography variant="subtitle2">KHALTI</Typography>
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
                          handleDialogOpen("E-Banking", "/image/e-bank.jpg")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="/image/e-bank.jpg"
                          alt="E-Banking"
                          style={{
                            width: "100px",
                            height: "auto",
                            marginTop: "25px",
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
                    style={{
                      marginTop: 20,
                      backgroundColor: "Green",
                      color: "white",
                    }}
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
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Terms and Conditions</Typography>
                <Divider />
                <Typography variant="body2">
                  By confirming this booking, you agree to the following terms
                  and conditions:
                </Typography>
                <ol>
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
            label="Phone Number"
            value={phoneNumberDialog}
            onChange={(e) => setPhoneNumberDialog(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            margin="normal"
            multiline
            rows={3}
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
