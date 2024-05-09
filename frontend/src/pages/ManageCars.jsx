import React, { useState, useEffect } from "react";
import axios from "axios";
import Appbar from "../components/Appbar";
import AddCar from "../components/AddCar";
import EditCar from "../components/EditCar";
import Navigation from "../components/Navigation";
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

function ManageCars() {
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    const username = "admin";

    // Fetch cars data for the logged-in user
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

    fetchData();
  }, []);
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Appbar />
      <AddCar />
      <div className="cars">
        <Grid container spacing={5} justifyContent="center" marginTop="-10px">
          {carsData.map((car) => (
            <Grid item key={car._id}>
              <Card
                sx={{
                  maxWidth: 345,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 8,
                  boxShadow: "0px 4px 8px rgba(38, 50, 56, 0.08)",
                }}
              >
                <EditCar />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={1}
                >
                  <CardMedia
                    sx={{ width: 300, height: 150 }}
                    image={`data:${car.picture.contentType};base64,${car.picture.data}`}
                    title={car.modelName}
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
                    {car.modelName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {car.price}
                  </Typography>
                  <br />
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <AcUnitIcon
                        sx={{
                          color: car.haveAc ? "green" : "red",
                          marginRight: 1,
                        }}
                      />
                      <Box marginLeft={1}>
                        {car.haveAc ? "Air-Conditioning" : "No AC"}
                      </Box>
                    </Box>
                    <Box display="flex">
                      <GroupsIcon sx={{ marginRight: 1 }} />
                      <Box marginLeft={1}>{car.seats}</Box>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <SettingsIcon sx={{ marginRight: 1 }} />
                      <Box marginLeft={1}>{car.system}</Box>
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
