import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

function Payment() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCarImage, setSelectedCarImage] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [mode, setMode] = useState("");
  const [username, setUsername] = useState("");
  const [paymentSuccessDialogOpen, setPaymentSuccessDialogOpen] =
    useState(false);
  const [paymentFailureDialogOpen, setPaymentFailureDialogOpen] =
    useState(false);
  const [fillDetailsDialogOpen, setFillDetailsDialogOpen] = useState(false);
  const [alreadyPaidDialogOpen, setAlreadyPaidDialogOpen] = useState(false);
  const [sentAmount, setSentAmount] = useState(""); // State to store the sent amount

  useEffect(() => {
    fetchData();
    // Set the sent amount when the component mounts
    if (location.state && location.state.amount) {
      setAmount(location.state.amount);
      setSentAmount(location.state.amount);
    }
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleDialogOpen = (carImage, selectedMode) => {
    setSelectedCarImage(carImage);
    setMode(selectedMode);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const fetchData = async () => {
    try {
      const paymentStatusResponse = await axios.get(
        `http://localhost:8000/renter/paymentStatus/${carId}`
      );
      if (paymentStatusResponse.data.status) {
        // Payment has already been made
        setAlreadyPaidDialogOpen(true);
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching payment status:", error);
    }
  };

  const handlePay = async () => {
    try {
      // Validate input fields
      if (!amount || !remarks || !paymentNumber || !username) {
        setFillDetailsDialogOpen(true);
        return;
      }

      const paydate = getCurrentDate();

      const paymentResponse = await axios.post(
        `http://localhost:8000/payment/paymentDetails`,
        {
          carId,
          remarks,
          amount,
          paymentNumber,
          mode,
          username,
          paymentDate: paydate,
        }
      );

      if (paymentResponse.data.status) {
        const updatePaidStatusResponse = await axios.post(
          `http://localhost:8000/renter/updatePaidStatus/${carId}`
        );

        if (updatePaidStatusResponse.data.status) {
          setPaymentSuccessDialogOpen(true);
        } else {
          setPaymentFailureDialogOpen(true);
        }
      } else {
        setPaymentFailureDialogOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setPaymentFailureDialogOpen(true);
    } finally {
      handleDialogClose();
    }
  };

  return (
    <>
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
            label="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            style={{ marginBottom: 10 }}
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
            value={sentAmount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{ readOnly: true }}
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

      {/* Payment Success Dialog */}
      <Dialog
        open={paymentSuccessDialogOpen}
        onClose={() => setPaymentSuccessDialogOpen(false)}
      >
        <DialogContent>
          <Typography variant="h6">Payment successful</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPaymentSuccessDialogOpen(false);
              navigate(`/UserDashboard`);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Failure Dialog */}
      <Dialog
        open={paymentFailureDialogOpen}
        onClose={() => setPaymentFailureDialogOpen(false)}
      >
        <DialogContent>
          <Typography variant="h6">
            Payment failed. Please try again.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentFailureDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Fill Details Dialog */}
      <Dialog
        open={fillDetailsDialogOpen}
        onClose={() => setFillDetailsDialogOpen(false)}
      >
        <DialogContent>
          <Typography variant="h6">Please fill in all the details.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFillDetailsDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Already Paid Dialog */}
      <Dialog
        open={alreadyPaidDialogOpen}
        onClose={() => setAlreadyPaidDialogOpen(false)}
      >
        <DialogContent>
          <Typography variant="h6">Payment already made</Typography>
          <Typography>
            The payment for this car has already been made.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAlreadyPaidDialogOpen(false);
              navigate(`/UserDashboard`);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

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
              onClick={() => handleDialogOpen("../image/esewa.png", "Esewa")}
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
              onClick={() => handleDialogOpen("../image/khalti.png", "Khalti")}
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
              onClick={() =>
                handleDialogOpen("../image/e-bank.jpg", "Ebanking")
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
      </Container>
    </>
  );
}

export default Payment;
