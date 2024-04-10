import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

const cardsData = [
  {
    id: 1,
    image: "image/home.png",
    title: "Hyundai Tucson",
    subtitle: "110$/day",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
  },
  {
    id: 2,
    image: "image/suv.png",
    title: "Compact SUV Electric",
    subtitle: "100$/day",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
  },
  {
    id: 3,
    image: "image/suv2.png",
    title: "Compact SUV Hybrid",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
  },
  {
    id: 4,
    image: "image/suv2.png",
    title: "Compact SUV Hybrid",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
  },
  // Add more card data as needed
];

function CarList() {
  return (
    <Grid container spacing={5} justifyContent="center" marginTop="-10px">
      {cardsData.map((card) => (
        <Grid item key={card.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ width: 345, height: 200 }}
              image={card.image}
              title={card.title}
            />
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
              <br></br>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <AcUnitIcon
                    sx={{
                      color: card.airConditioning ? "green" : "red",
                      marginRight: 1,
                    }}
                  />
                  <Box marginLeft={1}>
                    {card.airConditioning ? "Air-Conditioning" : "No AC"}
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <GroupsIcon sx={{ marginRight: 1 }} />
                  <Box marginLeft={1}>{card.passengers}</Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <SettingsIcon sx={{ color: "gre", marginRight: 1 }} />
                  <Box marginLeft={1}>{card.transmission}</Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CarList;
