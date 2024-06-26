import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import Navigation from "../components/Navigation";
import Appbar from "../components/Appbar";
import AddCar from "../components/AddCar";

const ManageCars = () => {
  const [carsData, setCarsData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editCarData, setEditCarData] = useState(null);
  const [deleteCarID, setDeleteCarID] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const username = "admin";
        const response = await axios.get(
          `http://localhost:8000/car/getCars/${username}`
        );
        setCarsData(response.data);
      } catch (error) {
        setError("Error fetching cars");
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleEditCar = (car) => {
    setEditCarData(car);
    setEditDialogOpen(true);
  };

  const handleEditCarClose = () => {
    setEditDialogOpen(false);
    setEditCarData(null);
  };

  const handleEditCarSave = async () => {
    try {
      await axios.post("http://localhost:8000/car/editCar", editCarData);
      setCarsData((prevCars) =>
        prevCars.map((car) =>
          car.carId === editCarData.carId ? editCarData : car
        )
      );
      setEditDialogOpen(false);
    } catch (error) {
      setError("Error editing car");
      console.error("Error editing car:", error);
    }
  };

  const handleDeleteDialogOpen = (carId) => {
    setDeleteCarID(carId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCar = async () => {
    try {
      await axios.delete(`http://localhost:8000/car/deleteCar/${deleteCarID}`);
      setCarsData((prevCars) =>
        prevCars.filter((car) => car.carId !== deleteCarID)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      setError("Error deleting car");
      console.error("Error deleting car:", error);
    }
  };

  const handleStatusChange = async (carId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/car/changeStatus/${carId}`,
        { status: newStatus }
      );
      const updatedCar = response.data;
      window.location.reload();

      setCarsData((prevCars) =>
        prevCars.map((car) =>
          car.carId === carId ? { ...car, status: updatedCar.status } : car
        )
      );
    } catch (error) {
      setError("Error changing status");
      console.error("Error changing status:", error);
    }
  };

  return (
    <>
      <Navigation />
      <Appbar />
      <AddCar />
      {error && <Alert severity="error">{error}</Alert>}
      <div className="cars">
        <Grid container spacing={5} justifyContent="center" marginTop="-200px">
          {carsData.map((car) => (
            <Grid item key={car.carId} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  maxWidth: 345,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 8,
                  boxShadow: "0px 4px 8px rgba(38, 50, 56, 0.08)",
                  position: "relative",
                }}
              >
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
                  sx={{ width: 300, height: 150, margin: 2 }}
                  image={`data:${car.picture.contentType};base64,${car.picture.data}`}
                  title={car.modelName}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", fontSize: 17 }}
                  >
                    {car.modelName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Price: {car.price}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    marginTop={2}
                  >
                    <Box display="flex">
                      <AcUnitIcon
                        sx={{
                          color: car.haveAc ? "green" : "red",
                          marginRight: 1,
                        }}
                      />
                      <Typography>
                        {car.haveAc ? "Air Conditioning" : "No AC"}
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <GroupsIcon sx={{ marginRight: 1 }} />
                      <Typography>{car.seats}</Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    marginTop={2}
                  >
                    <Box display="flex">
                      <SettingsIcon sx={{ marginRight: 1 }} />
                      <Typography>{car.system}</Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    marginTop={2}
                  >
                    <Button
                      variant="outlined"
                      sx={{ marginLeft: "10px", height: "30px" }}
                      onClick={() => handleEditCar(car)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ height: "30px" }}
                      color="primary"
                      onClick={() => handleDeleteDialogOpen(car.carId)}
                    >
                      Delete
                    </Button>
                    {car.status === "Rented" ? (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          height: "30px",
                        }}
                        onClick={() =>
                          handleStatusChange(car.carId, "Available")
                        }
                      >
                        Make Available
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "red", color: "white" }}
                        onClick={() => handleStatusChange(car.carId, "Rented")}
                      >
                        Make Rented
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {editDialogOpen && (
        <Dialog open={editDialogOpen} onClose={handleEditCarClose}>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Model Name"
                  fullWidth
                  style={{ marginTop: "20px" }}
                  value={editCarData?.modelName || ""}
                  onChange={(e) =>
                    setEditCarData({
                      ...editCarData,
                      modelName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  fullWidth
                  value={editCarData?.price || ""}
                  onChange={(e) =>
                    setEditCarData({ ...editCarData, price: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Seats"
                  fullWidth
                  value={editCarData?.seats || ""}
                  onChange={(e) =>
                    setEditCarData({ ...editCarData, seats: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editCarData?.haveAc || false}
                      onChange={() =>
                        setEditCarData((prev) => ({
                          ...prev,
                          haveAc: !prev.haveAc,
                        }))
                      }
                    />
                  }
                  label="Air Conditioning"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditCarClose}>Cancel</Button>
            <Button onClick={handleEditCarSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}

      {deleteDialogOpen && (
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Car</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this car?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDeleteCar}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ManageCars;
