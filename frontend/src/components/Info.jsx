import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

function Info() {
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
          <CarComponent
            title="Hyundai SUV"
            image="/image/suv.png"
            price="NPR 50,000/day"
          />
          <CarComponent
            title="Hyundai Tucson"
            image="/image/suv2.png"
            price="NPR 40,000/day"
          />
          <CarComponent
            title="Compact SUV Electric"
            image="/image/suv.png"
            price="NPR 30,000/day"
          />
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
            Call us for further information. Customer care is<br></br> here to
            help you anytime.
          </h1>
          <p style={{ fontSize: "25px", justifyContent: "right" }}>
            <PhoneIcon sx={{ fontSize: "50px", color: "red" }}></PhoneIcon>
            <br></br>
            CALL US NOW<br></br> 01-4473693<br></br>
            <Button
              variant="contained"
              sx={{
                fontSize: "13px",
                color: "white",
                backgroundColor: "red",
              }}
              type="submit"
            >
              CONTACT
            </Button>
          </p>
        </div>
      </Box>
    </div>
  );
}

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
          marginTop: "-100px",
          color: "white",
          marginLeft: "auto",
          marginRight: "20px",
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
        sx={{
          fontSize: "13px",
          marginTop: "-100px",
          color: "white",
          marginLeft: "auto",
          marginRight: "20px",
          marginTop: "-64px",
          backgroundColor: "red",
        }}
        type="submit"
      >
        RENT
      </Button>
    </CardActions>
  </Card>
);

export default Info;
