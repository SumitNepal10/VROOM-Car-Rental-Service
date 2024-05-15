import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function BookCar() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state.formData;
  const [carsData, setCarsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/car/availableCars/admin`
      );
      console.log(response.data);
      if (response.status !== 200) {
        navigate("/");
      } else {
        setCarsData(response.data);
        if (response.data.length === 0) {
          setOpenDialog(true);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/");
  };

  const handleBookNow = (carId) => {
    navigate(`/ConfirmBooking/${carId}`, { state: { bookingDetails } });
  };

  return (
    <>
      <Navigation />
      <div className="main-booking">
        <div className="left-card">
          <h2
            style={{
              fontSize: "17px",
              textAlign: "left",
              paddingLeft: "10px",
              color: "grey",
            }}
          >
            Booking Details
          </h2>
          <div
            className="detail"
            style={{ fontSize: "15px", textAlign: "left", paddingLeft: "10px" }}
          >
            <p>Pickup Location: {bookingDetails.pickupLocation}</p>
            <p>Drop-off Location: {bookingDetails.dropOffLocation}</p>
            <p>Pickup Date: {bookingDetails.pickupDate}</p>
            <p>Drop-off Date: {bookingDetails.dropOffDate}</p>
          </div>
        </div>
        <div className="right-cards">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching cars data: {error.message}</p>
          ) : (
            <>
              {console.log("carsData length:", carsData.length)}
              {carsData.length === 0 ? (
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>No Car</DialogTitle>
                  <DialogContent>
                    No Car available for now. Please come back later.
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>OK</Button>
                  </DialogActions>
                </Dialog>
              ) : (
                carsData.map((card) => (
                  <div className="right-card" key={card.id}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <CardMedia
                          sx={{ width: 300, height: 170, marginLeft:"20px", marginTop:"25px" }}
                          image={`data:${card.picture.contentType};base64,${card.picture.data}`}
                          title={card.title}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "30px",
                            marginLeft: "40px",
                          }}
                        >
                          <Typography variant="h6">Car Features</Typography>
                          <br />
                          <Box display="flex" alignItems="center">
                            <AcUnitIcon
                              sx={{
                                color: card.haveAc ? "green" : "red",
                                marginRight: 1,
                              }}
                            />
                            <Typography>
                              {card.haveAc ? "Air-Conditioning" : "No AC"}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <GroupsIcon sx={{ marginRight: 1 }} />
                            <Typography>{card.seats}</Typography>
                          </Box>
                          {typeof card.system !== "undefined" && (
                            <Box display="flex" alignItems="center">
                              <SettingsIcon
                                sx={{
                                  color: card.system ? "green" : "red",
                                  marginRight: 1,
                                }}
                              />
                              <Typography>
                                {card.system ? "auto" : "manual"}
                              </Typography>
                            </Box>
                          )}
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: "13px",
                              marginTop: "10px",
                              color: "white",
                              backgroundColor: "green",
                            }}
                            onClick={() => handleBookNow(card.carId)}
                          >
                            Book Now
                          </Button>
                        </Box>
                      </Box>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ fontWeight: "bold", fontSize: "17px" }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {card.subtitle}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default BookCar;
