import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Modal,
  Button,
} from "@mui/material";
import {
  Groups as GroupsIcon,
  Settings as SettingsIcon,
  AcUnit as AcUnitIcon,
  LocalGasStation as LocalGasStationIcon,
  Luggage as LuggageIcon,
} from "@mui/icons-material";

function CarList({ searchTerm, filterOption }) {
  const [carsData, setCarsData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/car/getCars/admin"
      );
      setCarsData(response.data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Filter cars based on search term and filter option
  const filteredCars = carsData.filter((car) => {
    const matchesSearchTerm =
      searchTerm === "" ||
      (filterOption === "Model" &&
        car.modelName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (filterOption === "Price" && Number(car.price) === Number(searchTerm));

    return matchesSearchTerm;
  });

  const handleCardClick = (car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      style={{ padding: "20px" }}
    >
      {filteredCars.map((car) => (
        <Grid item key={car._id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
              position: "relative",
              // objectFit: "contain",
              // objectPosition: "center",
            }}
            onClick={() => handleCardClick(car)}
          >
            {/* Status Box */}
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px",
                borderRadius: "5px",
                backgroundColor: car.status === "Rented" ? "red" : "green",
                color: "white",
                textAlign: "center",
              }}
            >
              {car.status === "Rented" ? "Rented" : "Available"}
            </Box>

            <CardMedia
              sx={{ marginLeft: 5, width: 350, height: 200 }}
              image={`data:${car.picture.contentType};base64,${car.picture.data}`}
              title={car.modelName}
            />
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", fontSize: "17px" }}
              >
                {car.modelName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontWeight: "bold" }}
              >
                NPR {car.price}/day
              </Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                paddingY="10px"
              >
                <Box display="flex" alignItems="center">
                  <AcUnitIcon
                    sx={{
                      color: car.haveAc ? "black" : "red",
                      marginRight: 1,
                    }}
                  />
                  <Typography variant="body2">
                    {car.haveAc ? "Air Conditioning" : "No AC"}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <GroupsIcon sx={{ color: "black", marginRight: 1 }} />
                  <Typography variant="body2">{car.seats} seats</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <SettingsIcon
                    sx={{
                      color: car.system === "auto" ? "black" : "red",
                      marginRight: 1,
                    }}
                  />
                  <Typography variant="body2">
                    {car.system === "auto" ? "Automatic" : "Manual"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Modal
        open={!!selectedCar}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            gap: "100px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedCar && (
            <>
              <CardMedia
                sx={{
                  width: 400,
                  height: 300,
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                image={`data:${selectedCar.picture.contentType};base64,${selectedCar.picture.data}`}
                title={selectedCar.title}
              />
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" gutterBottom>
                  {selectedCar.modelName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  NPR {selectedCar.price} /day
                </Typography>

                <Box
                  sx={{
                    marginTop: "10px",
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor:
                      selectedCar.status === "Rented" ? "red" : "green",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {selectedCar.status === "Rented" ? "Rented" : "Available"}
                </Box>

                <Typography variant="body1" gutterBottom>
                  <AcUnitIcon
                    sx={{
                      color: selectedCar.haveAc ? "black" : "red",
                      marginRight: 1,
                      fontSize: 15,
                    }}
                  />
                  {selectedCar.haveAc ? "Air Conditioning" : "No AC"}
                  <GroupsIcon
                    sx={{ marginRight: 1, marginLeft: 5, fontSize: 17 }}
                  />
                  Passengers: {selectedCar.seats}
                  <SettingsIcon
                    sx={{
                      color: "black",
                      marginRight: 1,
                      marginLeft: 5,
                      fontSize: 15,
                    }}
                  />
                  {selectedCar.system}
                </Typography>

                <Box textAlign="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Vehicle Features
                  </Typography>
                  <Box
                    display="flex"
                    marginTop="20px"
                    justifyContent="space-between"
                  >
                    <Box>
                      <AcUnitIcon
                        sx={{
                          color: selectedCar.haveAc ? "black" : "red",
                          fontSize: 30,
                          backgroundColor: "#D9D9D9",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      />
                      <Typography variant="body1">
                        {selectedCar.haveAc ? "AC" : "No AC"}
                      </Typography>
                    </Box>
                    <Box>
                      <GroupsIcon
                        sx={{
                          fontSize: 30,
                          backgroundColor: "#D9D9D9",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      />
                      <Typography variant="body1">
                        {selectedCar.seats}
                      </Typography>
                    </Box>
                    <Box>
                      <SettingsIcon
                        sx={{
                          color: "black",
                          fontSize: 30,
                          backgroundColor: "#D9D9D9",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      />
                      <Typography variant="body1">
                        {selectedCar.system}
                      </Typography>
                    </Box>
                    <Box>
                      <LuggageIcon
                        sx={{
                          color: "black",
                          fontSize: 30,
                          backgroundColor: "#D9D9D9",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      />
                      <Typography variant="body1">
                        {selectedCar.luggage}
                      </Typography>
                    </Box>
                    <Box>
                      <LocalGasStationIcon
                        sx={{
                          color: "black",
                          fontSize: 30,
                          backgroundColor: "#D9D9D9",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      />
                      <Typography variant="body1">
                        {selectedCar.fuel}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Grid>
  );
}

export default CarList;
