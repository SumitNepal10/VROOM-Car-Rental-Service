import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

function Payment() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCarImage, setSelectedCarImage] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [phoneNumberDialog, setPhoneNumberDialog] = useState("");

  const handleDialogOpen = (carImage) => {
    setSelectedCarImage(carImage);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePay = () => {
    // Add logic to handle payment
    console.log("Payment processed:", selectedCarImage, amount, remarks);
    setDialogOpen(false);
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Typography
          style={{
            color: "#000433",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Select Payment Mode
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
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
              onClick={() => handleDialogOpen("../image/esewa.png")}
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
              <Typography variant="subtitle2" style={{ marginTop: "10px" }}>
                ESEWA
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
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
              onClick={() => handleDialogOpen("../image/khalti.png")}
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
              <Typography variant="subtitle2" style={{ marginTop: "10px" }}>
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
              onClick={() => handleDialogOpen("../image/e-bank.jpg")}
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
          // Disabled logic here
          style={{ marginTop: 20, backgroundColor: "Green", color: "white" }}
          onClick={handlePay}
        >
          Confirm Booking
        </Button>
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
      <Footer />
    </>
  );
}

export default Payment;
