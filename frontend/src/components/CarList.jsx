import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LuggageIcon from "@mui/icons-material/Luggage";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

const cardsData = [
  {
    id: 1,
    image: "image/home.png",
    title: "Hyundai Tucson",
    subtitle: "NPR 7000/day",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
    luggage: 4,
    fuel: "Petrol",
  },
  {
    id: 2,
    image: "image/suv.png",
    title: "Compact SUV Electric",
    subtitle: "NPR 5500/day",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
    luggage: 4,
    fuel: "Petrol",
  },
  {
    id: 3,
    image: "image/suv2.png",
    title: "Compact SUV Hybrid",
    subtitle: "NPR 5000/day",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
    luggage: 4,
    fuel: "Petrol",
  },
  {
    id: 4,
    image: "image/suv2.png",
    title: "Compact SUV Hybrid",
    subtitle: "NPR 5000/day",
    passengers: 5,
    transmission: "Automatic",
    airConditioning: true,
    luggage: 4,
    fuel: "Petrol",
  },
  // Add more card data as needed
];

function CarList() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <Grid container spacing={5} justifyContent="center" marginTop="-10px">
      {cardsData.map((card) => (
        <Grid item key={card.id}>
          <Card
            sx={{
              height: "100%", // Set a fixed height for the card
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => handleCardClick(card)}
          >
            <CardMedia
              sx={{ width: 300, height: 200 }}
              image={card.image}
              title={card.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
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
                <Box display="flex">
                  <AcUnitIcon
                    sx={{
                      color: card.airConditioning ? "black" : "red",
                      marginRight: 1,
                    }}
                  />
                  <Box marginLeft={1}>
                    {card.airConditioning ? "Air-Conditioning" : "No AC"}
                  </Box>
                </Box>
                <Box display="flex">
                  <GroupsIcon sx={{ color: "black", marginRight: 1 }} />
                  <Box marginLeft={1}>{card.passengers}</Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <SettingsIcon
                    sx={{ color: "black", marginRight: 1 }} // Did you mean "green" instead of "gre"?
                  />
                  <Box marginLeft={1}>{card.transmission}</Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Modal
        open={!!selectedCard}
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
          {selectedCard && (
            <>
              <CardMedia
                sx={{ width: 300, height: 200 }}
                image={selectedCard.image}
                title={selectedCard.title}
              />
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" gutterBottom>
                  {selectedCard.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedCard.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "13px",
                    marginTop: "10px",
                    color: "white",
                    backgroundColor: "red",
                    width: "150px",
                    marginBottom: "20px",
                  }}
                  type="submit"
                >
                  Book Now
                </Button>
                <Typography variant="body1" gutterBottom>
                  <AcUnitIcon
                    sx={{
                      color: selectedCard.airConditioning ? "black" : "red",
                      marginRight: 1,
                      fontSize: 15,
                    }}
                  />
                  {selectedCard.airConditioning ? "Air-Conditioning" : "No AC"}
                  <GroupsIcon
                    sx={{ marginRight: 1, marginLeft: 5, fontSize: 17 }}
                  />
                  Passengers: {selectedCard.passengers}
                  <SettingsIcon
                    sx={{
                      color: "black",
                      marginRight: 1,
                      marginLeft: 5,
                      fontSize: 15,
                    }}
                  />
                  {selectedCard.transmission}
                </Typography>

                <Box textAlign="center">
                  <h style={{ fontWeight: "bold" }}>Vehicle Features</h>
                  <Box
                    display="flex"
                    marginTop="20px"
                    justifyContent="space-between"
                  >
                    <Box>
                      <AcUnitIcon
                        sx={{
                          color: selectedCard.airConditioning ? "black" : "red",
                          fontSize: 30,
                          backgroundColor: "#D9D9D9",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      />
                      <Typography variant="body1">
                        {selectedCard.airConditioning ? "AC" : "No AC"}
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
                        {selectedCard.passengers}
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
                        {selectedCard.transmission}
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
                        {selectedCard.luggage}
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
                        {selectedCard.fuel}
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
