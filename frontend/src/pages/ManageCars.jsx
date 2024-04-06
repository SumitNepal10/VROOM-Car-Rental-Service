import React, { useState } from "react";
import Appbar from "../components/Appbar";
import AddCar from "../components/AddCar";
import EditCar from "../components/EditCar";
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
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

function ManageCars() {
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
  // const [dialogOpen, setDialogOpen] = useState(false);

  // const handleOpenDialog = () => {
  //   setDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  // };

  return (
    <>
      <Appbar />
      <div
        className="heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h style={{ marginRight: "700px", fontSize: "20px" }}>Car Inventory</h>
        <AddCar />
      </div>
      <div className="cars">
        <Grid container spacing={5} justifyContent="center" marginTop="-10px">
          {cardsData.map((card) => (
            <Grid item key={card.id}>
              <Card
                sx={{
                  height: "100%", // Set a fixed height for the card
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <EditCar />

                {/* <Box display="flex" justifyContent="flex-end" padding={1}>
                  <Box sx={{ marginRight: 1 }}>
                    <EditIcon />
                  </Box>
                  <Box>
                    <DeleteIcon />
                  </Box>
                </Box> */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={1}
                >
                  <CardMedia
                    sx={{ width: 300, height: 150 }}
                    image={card.image}
                    title={card.title}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
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
                  <br />
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
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
                    <Box display="flex">
                      <GroupsIcon sx={{ marginRight: 1 }} />
                      <Box marginLeft={1}>{card.passengers}</Box>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <SettingsIcon sx={{ marginRight: 1 }} />
                      <Box marginLeft={1}>{card.transmission}</Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ManageCars;
