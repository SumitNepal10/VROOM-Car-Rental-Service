import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

import Axios from "axios";

function AddCar() {
  const [open, setOpen] = useState(false);
  const userName = localStorage.getItem("username");
  const [carInfo, setCarInfo] = useState({
    modelName: "",
    price: "",
    seats: "",
    system: "",
    haveAc: false,
    picture: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("modelName", carInfo.modelName);
    formData.append("price", carInfo.price);
    formData.append("seats", carInfo.seats);
    formData.append("system", carInfo.system);
    formData.append("haveAc", carInfo.haveAc);
    formData.append("picture", carInfo.picture);
    formData.append("user", userName);

    try {
      const response = await Axios.post(
        "http://localhost:8000/car/addcar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        alert("Car has been added successfully");
        handleClose();
      } else {
        alert("Failed to add car. Please try again.");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarInfo({
      ...carInfo,
      [name]: value,
    });
  };

  const handleSwitchChange = () => {
    setCarInfo({
      ...carInfo,
      haveAc: !carInfo.haveAc,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCarInfo({
      ...carInfo,
      picture: file,
    });
  };

  return (
    <div className="addcar-form">
      <React.Fragment>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            fontSize: "15px",
            color: "white",
            backgroundColor: "red",
            marginRight: "0px",
            marginTop: "-450px",
            marginLeft: "1100px",
          }}
        >
          Add vehicle
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ paddingTop: "5px" }}>
              <Grid item xs={12}>
                <TextField
                  id="modelName"
                  name="modelName"
                  label="Model Name"
                  type="text"
                  fullWidth
                  value={carInfo.modelName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="price"
                  name="price"
                  label="Price"
                  type="text"
                  fullWidth
                  value={carInfo.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="seats"
                  name="seats"
                  label="Number of Seats"
                  type="number"
                  fullWidth
                  value={carInfo.seats}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="system"
                  name="system"
                  label="System"
                  type="text"
                  fullWidth
                  value={carInfo.system}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={carInfo.haveAc}
                      onChange={handleSwitchChange}
                      name="haveAc"
                    />
                  }
                  label="Air Conditioning"
                />
              </Grid>
              <Grid item xs={12}>
                Upload picture<br></br>
                <br></br>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default AddCar;
