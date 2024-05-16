import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Card,
  CardMedia,
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
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

function ConfirmBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { carId } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSecondOpen, setDialogSecondOpen] = useState(false);
  const [dialogThirdOpen, setDialogThirdOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [secondDialogMessage, setSecondDialogMessage] = useState("");
  const [thirdDialogMessage, setThirdDialogMessage] = useState("");
  const [fileDisplayName, setFileDisplayName] = useState("");
  const bookingDetails = location.state ? location.state.bookingDetails : null;
  const [renterInfo, setRenterInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pickupLocation: "",
    dropOffLocation: "",
    pickupDate: "",
    dropOffDate: "",
    agreeToTerms: false,
    isPaid: false,
    Amount: null,
    remarks: null,
    paymentNumber: null,
    driverLicense: null,
  });

  useEffect(() => {
    if (bookingDetails) {
      const { pickupLocation, dropOffLocation, pickupDate, dropOffDate } =
        bookingDetails;
      setRenterInfo((prevInfo) => ({
        ...prevInfo,
        pickupLocation,
        dropOffLocation,
        pickupDate,
        dropOffDate,
      }));
    }
  }, [bookingDetails]);

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/car/getCar/${carId}`
      );
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const checkCarStatus = async () => {
      if (carData.length > 0 && carData[0].status === "Rented") {
        openSecondDialog(
          "This car is already booked. Please select another one."
        );
      }
    };

    checkCarStatus();
  }, [carData, navigate]);

  const handleChange = (event) => {
    const { name, value, checked, files } = event.target;

    if (name === "pickupDate" || name === "dropOffDate") {
      const otherDateName =
        name === "pickupDate" ? "dropOffDate" : "pickupDate";
      const otherDateValue = renterInfo[otherDateName];

      // Convert current date to UTC
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);

      // Convert selected pickup date to UTC
      const selectedPickupDate = new Date(value);
      selectedPickupDate.setUTCHours(0, 0, 0, 0);

      if (selectedPickupDate < currentDate) {
        openDialog("Pickup date should be after the current date");
        return;
      }

      if (otherDateValue && selectedPickupDate < new Date(otherDateValue)) {
        openDialog("Pickup date should be before drop-off date");
        return;
      }
    }

    setRenterInfo((prevInfo) => ({
      ...prevInfo,
      [name]:
        name === "agreeToTerms"
          ? checked
          : name === "isPaid"
          ? value === "true"
          : files
          ? files[0]
          : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRenterInfo((prevInfo) => ({
      ...prevInfo,
      driverLicense: file,
    }));
    setFileDisplayName(file ? file.name : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!renterInfo.agreeToTerms) {
      openDialog("Please accept the terms and conditions");
      return;
    }

    // Function to calculate total price based on pickup and drop-off dates
    const amount = calculateTotalPrice(
      renterInfo.pickupDate,
      renterInfo.dropOffDate,
      carData.length > 0 ? carData[0].price : 0
    );

    const formData = new FormData();
    formData.append("fullName", renterInfo.fullName);
    formData.append("email", renterInfo.email);
    formData.append("phoneNumber", renterInfo.phoneNumber);
    formData.append("pickupLocation", renterInfo.pickupLocation);
    formData.append("dropOffLocation", renterInfo.dropOffLocation);
    formData.append("pickupDate", renterInfo.pickupDate);
    formData.append("dropOffDate", renterInfo.dropOffDate);
    formData.append("isPaid", false);
    formData.append("driverLicense", renterInfo.driverLicense);
    formData.append("carId", carId);
    formData.append("amount", amount);
    formData.append("paymentNumber", renterInfo.paymentNumber);
    formData.append("remarks", renterInfo.remarks);

    const user = localStorage.getItem("username");
    formData.append("userToBook", user);

    try {
      const response = await axios.post(
        `http://localhost:8000/renter/newRenter`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        try {
          await axios.post(
            `http://localhost:8000/car/updateCarStatus/${carId}`
          );
        } catch (error) {
          console.error("Error updating the car status");
        }
        if (renterInfo.isPaid) {
          navigate(`/Payment/${carId}`, { state: { amount } });
        } else {
          setThirdDialogMessage("Car booked successfully");
          setDialogThirdOpen(true);
        }
      } else {
        openDialog("Failed to book the car");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateTotalPrice = (pickupDate, dropOffDate, price) => {
    if (!pickupDate || !dropOffDate || !price) return 0;

    // Parse price to a number
    const parsedPrice = parseFloat(price);

    // Convert dates to Date objects
    const pickup = new Date(pickupDate);
    const dropOff = new Date(dropOffDate);

    // Calculate number of days
    const diffTime = Math.abs(dropOff - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate total price
    const totalPrice = parsedPrice * diffDays;

    if (diffDays === 0) {
      return parsedPrice;
    } else {
      return totalPrice || 0;
    }
  };

  const openDialog = (message) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const openSecondDialog = (message) => {
    setSecondDialogMessage(message);
    setDialogSecondOpen(true);
  };

  const openThirdDialog = (message) => {
    setThirdDialogMessage(message);
    setDialogThirdOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const closeSecondDialog = () => {
    setDialogSecondOpen(false);
    navigate("/");
  };

  const closeThirdDialog = () => {
    setDialogThirdOpen(false);
    navigate("/UserDashboard");
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid container spacing={3}>
          {/* Renter Information Card */}
          <Grid item xs={12} sm={6}>
            <Card variant="standard">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Renter Information
                </Typography>
                <Divider />
                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                  {/* Form fields */}
                  <Typography>Full Name</Typography>
                  <TextField
                    fullWidth
                    name="fullName"
                    size="small"
                    value={renterInfo.fullName}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <br />
                  <Typography>Email</Typography>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    size="small"
                    value={renterInfo.email}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <br />
                  <Typography>Phone Number</Typography>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    size="small"
                    value={renterInfo.phoneNumber}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <br />
                  <Typography>Pickup Location</Typography>
                  <TextField
                    fullWidth
                    name="pickupLocation"
                    size="small"
                    value={renterInfo.pickupLocation}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <br />
                  <Typography>Drop-off Location</Typography>
                  <TextField
                    fullWidth
                    name="dropOffLocation"
                    size="small"
                    value={renterInfo.dropOffLocation}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <br />

                  <Typography>Pickup Date</Typography>
                  <TextField
                    fullWidth
                    name="pickupDate"
                    type="date"
                    size="small"
                    value={renterInfo.pickupDate}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <Typography>Drop-off Date</Typography>
                  <TextField
                    fullWidth
                    name="dropOffDate"
                    type="date"
                    size="small"
                    value={renterInfo.dropOffDate}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <Typography>Upload your driver's license</Typography>
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
                        {fileDisplayName || "Choose your file here"}
                      </Typography>
                    </label>
                  </Box>
                  {/* radio buttons */}
                  <FormControlLabel
                    control={
                      <Radio
                        checked={renterInfo.isPaid === true}
                        onChange={handleChange}
                        value={true}
                        name="isPaid"
                      />
                    }
                    label="Pay Now"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={renterInfo.isPaid === false}
                        onChange={handleChange}
                        value={false}
                        name="isPaid"
                      />
                    }
                    label="Pay Later"
                  />

                  {/* Book Now button */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: 40,
                      backgroundColor: "Green",
                      color: "white",
                    }}
                  >
                    Book Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Car Information and Terms and Conditions Cards */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={3}>
              {/* Car Information Card */}
              {carData.map((car) => (
                <Grid item key={car.carId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "right",
                      justifyContent: "right",
                      width: 500,
                      height: 300,
                      borderRadius: 8,
                      boxShadow: "0px 4px 8px rgba(38, 50, 56, 0.08)",
                    }}
                  >
                    <CardMedia
                      sx={{ width: 300, height: 150 }}
                      image={`data:${car.picture.contentType};base64,${car.picture.data}`}
                      title={car.modelName}
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", fontSize: 17 }}
                      >
                        {car.modelName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        Price: {car.price}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        marginTop={2}
                      >
                        <Box display="flex">
                          <AcUnitIcon
                            sx={{
                              color: car.haveAc ? "green" : "red",
                              marginRight: 1,
                            }}
                          />
                          <Typography>
                            {car.haveAc ? "Air Conditioning" : "No AC"}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <GroupsIcon sx={{ marginRight: 1 }} />
                          <Typography>{car.seats}</Typography>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        marginTop={2}
                      >
                        <Box display="flex">
                          <SettingsIcon sx={{ marginRight: 1 }} />
                          <Typography>{car.system}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {/* Terms and Conditions Card */}
              <Grid item xs={12}>
                <Card variant="standard">
                  <CardContent>
                    {/* Terms and Conditions content */}
                    <Typography variant="h5" gutterBottom>
                      Terms and Conditions
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                      By confirming this booking, you agree to the following
                      terms and conditions:
                    </Typography>
                    <ol style={{ paddingLeft: 20 }}>
                      <li>You must be at least 21 years old to rent a car.</li>
                      <li>
                        A valid driver's license and credit card in the renter's
                        name are required.
                      </li>
                      <li>
                        The rental period starts and ends at the agreed-upon
                        dates and times.
                      </li>
                      <li>
                        Any damage to the rental car during the rental period is
                        the renter's responsibility.
                      </li>
                    </ol>
                  </CardContent>
                  {/* Checkboxes */}
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
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Dialog Boxes */}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>{dialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogSecondOpen} onClose={closeSecondDialog}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>{secondDialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={closeSecondDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogThirdOpen} onClose={closeThirdDialog}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>{thirdDialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={closeThirdDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmBooking;
