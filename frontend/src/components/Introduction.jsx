import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

function Introduction() {
  return (
    <div className="about">
      <Box
        component="section"
        sx={{
          position: "relative",
          height: "300px",
          backgroundImage: "url('image/intro.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "left",
          padding: "20px",
        }}
      >
        <div className="introText" style={{ marginTop: "50px", marginLeft:"20px" }}>
          <h style={{ fontSize: "30px" }}>
            Your Trusted Partner for Car Rentals
          </h>
          <p>
            Making car rentals easy and affordable. Explore more with the
            freedom<br></br> and flexibility you deserve.
          </p>
        </div>
      </Box>
      <Box
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "grey",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Renting a car? You're at the right place.
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "20px", justifyContent: "center", height: "300px" }}
      >
        {/* Two cards in the first column */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ width: 300, border: 0, boxShadow: "none" }}>
            <CardContent style={{ display: "flex" }}>
              <div className="icon">
                <EmojiEventsIcon
                  sx={{ fontSize: 40, color: "red", marginRight: "10px" }}
                />
              </div>
              <div className="feature">
                <Typography variant="h6" fontWeight="bold" component="div">
                  10+years of providing car rental service
                </Typography>
                <Typography variant="body2" color="grey">
                  For a decade, we've been delivering car rental services,
                  ensuring safety and comfort on every unforgettable journey.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", justifyContent: "center", height: "300px" }}
        >
          <Card sx={{ width: 300, border: 0, boxShadow: "none" }}>
            <CardContent style={{ display: "flex" }}>
              <div className="icon">
                <DirectionsCarIcon
                  sx={{ fontSize: 40, color: "red", marginRight: "10px" }}
                />
              </div>
              <div className="feature">
                <Typography variant="h6" fontWeight="bold" component="div">
                  Safe rides anyday, everyday (24/7 365 days)
                </Typography>
                <Typography variant="body2" color="grey">
                  Count on us for safe and reliable journeys, available 24/7,
                  365 days a year – because we're always on duty to serve you.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Picture in the center */}
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "300px",
            marginTop: "-160px",
          }}
        >
          <Card sx={{ width: 300, border: 0, boxShadow: "none" }}>
            <img
              src="image/home.png"
              alt="Home Image"
              style={{ width: "300px" }}
            />
          </Card>
        </Grid>
        {/* Two cards in the third column */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "300px",
            marginTop: "-135px",
          }}
        >
          <Card sx={{ width: 300, border: 0, boxShadow: "none" }}>
            <CardContent style={{ display: "flex" }}>
              <div className="icon">
                <EmojiTransportationIcon
                  sx={{ fontSize: 40, color: "red", marginRight: "10px" }}
                />
              </div>
              <div className="feature">
                <Typography variant="h6" fontWeight="bold" component="div">
                  Services available in 50+ major cities
                </Typography>
                <Typography variant="body2" color="grey">
                  Experience our premier services in over 50 major cities,
                  ensuring luxury and convenience wherever your journey takes
                  you.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-135px",
          }}
        >
          <Card sx={{ width: 300, border: 0, boxShadow: "none" }}>
            <CardContent style={{ display: "flex" }}>
              <div className="icon">
                <ManageSearchIcon
                  sx={{ fontSize: 40, color: "red", marginRight: "10px" }}
                />
              </div>
              <div className="feature">
                <Typography variant="h6" fontWeight="bold" component="div">
                  Range of Options - Economical Hiring to Posh Premium Cars
                </Typography>
                <Typography variant="body2" color="grey">
                  Choose your favorite car from our versatile vehicle fleet that
                  caters to every need, no matter your style or budget.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default Introduction;
