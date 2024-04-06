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

function AddCar() {
  const [open, setOpen] = useState(false);
  const [carInfo, setCarInfo] = useState({
    modelName: "",
    price: "",
    seats: "",
    system: "",
    airConditioning: false,
    picture: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      airConditioning: !carInfo.airConditioning,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCarInfo({
      ...carInfo,
      picture: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform additional validation or submit data to backend here
    console.log(carInfo);
    handleClose();
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
            marginRight: "10px",
            marginTop: "20px",
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
                      checked={carInfo.airConditioning}
                      onChange={handleSwitchChange}
                      name="airConditioning"
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
