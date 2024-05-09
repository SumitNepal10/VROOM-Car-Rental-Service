import React from "react";
import Navigation from "../components/Navigation";
import {
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Link } from "react-router-dom";

function BookCar() {
  const cardsData = [
    {
      id: 1,
      image: "image/home.png",
      title: "Hyundai Tucson",
      subtitle: "NPR 7000/day",
      passengers: 5,
      transmission: "Automatic",
      airConditioning: true,
    },
    {
      id: 2,
      image: "image/suv.png",
      title: "Compact SUV Electric",
      subtitle: "NPR 5500/day",
      passengers: 5,
      transmission: "Automatic",
      airConditioning: true,
    },
    {
      id: 3,
      image: "image/suv2.png",
      title: "Compact SUV Hybrid",
      subtitle: "NPR 5000/day",
      passengers: 5,
      transmission: "Automatic",
      airConditioning: true,
    },
    {
      id: 4,
      image: "image/suv2.png",
      title: "Compact SUV Hybrid",
      subtitle: "NPR 5000/day",
      passengers: 5,
      transmission: "Automatic",
      airConditioning: true,
    },
    // Add more card data as needed
  ];
  return (
    <>
      <Navigation />
      <div className="main-booking">
        <div className="left-card">
          {/* Left side card content */}
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
            <p>From: </p>
            <p>To: </p>
            <p>Start Date: </p>
            <p>End Date: </p>
          </div>
        </div>
        <div className="right-cards">
          {cardsData.map((card) => (
            <div className="right-card" key={card.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <CardMedia
                    sx={{ width: 300, height: 170 }}
                    image={card.image}
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
                    <h>Car Features</h>
                    <br></br>
                    <Box display="flex" alignItems="center">
                      <AcUnitIcon
                        sx={{
                          color: card.airConditioning ? "green" : "red",
                          marginRight: 1,
                        }}
                      />
                      <Typography>
                        {card.airConditioning ? "Air-Conditioning" : "No AC"}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <GroupsIcon sx={{ marginRight: 1 }} />
                      <Typography>{card.passengers}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <SettingsIcon sx={{ color: "green", marginRight: 1 }} />
                      <Typography>{card.transmission}</Typography>
                    </Box>
                    <Link to="/ConfirmBooking">
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: "13px",
                          marginTop: "10px",
                          color: "white",
                          backgroundColor: "red",
                        }}
                        // type="submit"
                      >
                        Book Now
                      </Button>
                    </Link>
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
          ))}
        </div>
      </div>
    </>
  );
}

export default BookCar;
