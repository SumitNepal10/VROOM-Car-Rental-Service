import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

import { useNavigate } from "react-router-dom";

const Info = () => {
  const [carsData, setCarsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
<<<<<<< HEAD
        "http://localhost:8000/cars/getCars/admin"
=======
        "http://localhost:8000/car/getCars/admin"
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
      );
      setCarsData(response.data);
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="packages">
        <h2>Tour Packages</h2>
        <p>Choose us for your unforgettable journeys.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CardComponent
            title="Pokhara"
            image="/image/pokhara.jpg"
            price="NPR 30,000"
            status = "Rented"
          />
          <CardComponent
            title="Nagarkot"
            image="/image/nagarkot.jpg"
            price="NPR 25,000"
            status = "Rented"
          />
          <CardComponent
            title="Chitwan"
            image="/image/chitwan.jpg"
            price="NPR 35,000"
            status = "Rented"
          />
        </div>
      </div>

      <div className="main-cars">
        <h2>Top Sellers</h2>
        <p>Explore the city with our top seller cars.</p>
<<<<<<< HEAD
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginLeft: "150px",
            gap: "10px",
            maxWidth: "1300px",
          }}
        >
          {carsData.map((car) => (
            <CardComponent
              key={car.id}
              title={car.modelName}
              image={`data:${car.picture.contentType};base64,${car.picture.data}`}
              price={`NPR ${car.price}/day`}
              carId={car.carId}
              status={car.status}
            />
          ))}
=======
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginLeft: "150px",
            gap: "10px",
            maxWidth: "1300px",
          }}
        >
          {carsData.map((car) => (
            <CardComponent
              key={car.id}
              title={car.modelName}
              image={`data:${car.picture.contentType};base64,${car.picture.data}`}
              price={`NPR ${car.price}/day`}
              carId={car.carId}
              status={car.status}
            />
          ))}
        </div>
      </div>

      <Box
        component="section"
        sx={{
          position: "relative",
          height: "220px",
          backgroundColor: "white",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "50px",
            padding: "0 20px",
          }}
        >
          <h1 style={{ fontSize: "25px" }}>
            Call us for further information. Customer care is here to help you
            anytime.
          </h1>
          <p style={{ fontSize: "25px", justifyContent: "right" }}>
            <PhoneIcon sx={{ fontSize: "50px", color: "red" }} />
            <br />
            CALL US NOW
            <br />
            01-4473693
            <br />
            <Button
              variant="contained"
              sx={{ fontSize: "13px", color: "white", backgroundColor: "red" }}
              type="submit"
            >
              CONTACT
            </Button>
          </p>
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
        </div>
        <div
  style={{
    backgroundColor: "black", // Light color background
    padding: "20px", // Add padding for spacing
  }}
>
<h2 style={{ fontSize: "25px", color: "white" }}>
  Call us for further information. Customer care is here to help you
  anytime.
</h2>
  <p style={{ fontSize: "25px", justifyContent: "right" }}>
    <PhoneIcon sx={{ fontSize: "50px", color: "red" }} />
    <br />
    CALL US NOW
    <br />
    01-4473693
    <br />
    <Link to="/CONTACT">
    <Button
      variant="contained"
      sx={{ fontSize: "13px", color: "white", backgroundColor: "red" }}
      type="submit"
    >
      CONTACT
    </Button>
    </Link>
  </p>
</div>

      </div>

    </div>
  );
};

const CardComponent = ({ title, image, price, carId, status }) => {
  const navigate = useNavigate();

  const handleRentClick = () => {
<<<<<<< HEAD
    navigate(`/ConfirmBooking/${carId}`); // Fixed the navigate function call
=======
    navigate(`/ConfirmBooking/${carId}`);
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "10px" }}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
<<<<<<< HEAD
            style={{ textAlign: "left" }}git
=======
            style={{ textAlign: "left" }}
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ textAlign: "left" }}
          >
            {price}
          </Typography>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 10,
              marginTop: "10px",
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: status === "Rented" ? "red" : "green",
              color: "white",
              textAlign: "center",
            }}
          >
            {status === "Rented" ? "Rented" : "Available"}
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            fontSize: "13px",
            color: "white",
            marginLeft: "auto",
<<<<<<< HEAD
            backgroundColor: "red",
          }}
          type="button"
=======
            backgroundColor: status === "Rented" ? "red" : "green",
          }}
          type="button"
          disabled={status === "Rented"}
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
          onClick={handleRentClick}
        >
          RENT
        </Button>
      </CardActions>
    </Card>
  );
};

export default Info;
