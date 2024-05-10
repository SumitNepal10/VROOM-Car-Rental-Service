import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

const Info = () => {
  const [carsData, setCarsData] = useState([]);
  const username = "admin";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/car/getCars/${username}`
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
          {/* Tour packages*/}
          <CardComponent
            title="Pokhara"
            image="/image/pokhara.jpg"
            price="NPR 30,000"
          />
          <CardComponent
            title="Nagarkot"
            image="/image/nagarkot.jpg"
            price="NPR 25,000"
          />
          <CardComponent
            title="Chitwan"
            image="/image/chitwan.jpg"
            price="NPR 35,000"
          />
        </div>
      </div>

      <div className="main-cars">
        <h2>Top Sellers</h2>
        <p>Explore the city with our top seller cars.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {}
          {carsData.map((car) => (
            <CarComponent
              key={car.id} // Unique key for each item in the list
              title={car.modelName}
              image={`data:${car.picture.contentType};base64,${car.picture.data}`}
              price={`NPR ${car.price}/day`}
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
          className="introText"
          style={{
            display: "flex",
            gap: "300px",
            justifyContent: "normal",
            marginTop: "50px",
            marginLeft: "20px",
          }}
        >
          <h1 style={{ fontSize: "25px", marginLeft: "100px" }}>
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
        </div>
      </Box>
    </div>
  );
};

const CardComponent = ({ title, image, price }) => (
  <Card sx={{ maxWidth: 345, margin: "0 10px" }}>
    <CardActionArea>
      <CardMedia component="img" height="200" image={image} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textAlign: "left" }}
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
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button
        variant="contained"
        sx={{
          fontSize: "13px",
          color: "white",
          marginLeft: "auto",
          backgroundColor: "red",
        }}
        type="submit"
      >
        BUY
      </Button>
    </CardActions>
  </Card>
);

const CarComponent = ({ title, image, price }) => (
  <Card sx={{ maxWidth: 345, margin: "0 10px" }}>
    <CardActionArea>
      <CardMedia component="img" height="200" image={image} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textAlign: "left" }}
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
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button
        variant="contained"
        sx={{ fontSize: "13px", marginLeft: "auto", backgroundColor: "red" }}
        type="submit"
      >
        RENT
      </Button>
    </CardActions>
  </Card>
);

export default Info;
