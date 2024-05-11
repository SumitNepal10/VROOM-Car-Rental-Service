import Navigation from "../components/Navigation";
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
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Payment() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCarImage, setSelectedCarImage] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");

  const handleDialogOpen = (carImage) => {
    setSelectedCarImage(carImage);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePay = async () => {
    if (amount === "" || remarks === "" || paymentNumber === "") {
      alert("Please fill all the details.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/payment/paymentDetails`,
        {
          carId: carId,
          remarks: remarks,
          amount: amount,
          paymentNumber: paymentNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        alert("Payment successful");
        navigate(`/UserDashboard/${carId}`);
        setDialogOpen(false);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
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
            value={paymentNumber}
            onChange={(e) => setPaymentNumber(e.target.value)}
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
            style={{ backgroundColor: "green", color: "white" }}
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

export default Payment;
