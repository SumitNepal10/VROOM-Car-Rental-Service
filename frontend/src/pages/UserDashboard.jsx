import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Card from "@mui/material/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function UserDashboard() {
  const [displayedContent, setDisplayedContent] = useState("dashboard");

  const handleProfileClick = () => {
    setDisplayedContent("profile");
  };

  const handleDashboardClick = () => {
    setDisplayedContent("dashboard");
  };

  const handleProfilePictureUpload = () => {
    // Add functionality to handle profile picture upload here
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <div className="bgimage"></div>
      <div className="containerDash">
        <div className="cardOne">
          <Card style={{ height: "100%" }}>
            <div className="profileSection">
              <div className="profilePictureContainer">
                <label htmlFor="profilePictureInput">
                  <AccountCircleIcon
                    fontSize="large"
                    cursor="pointer"
                    style={{ color: "green" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    style={{ display: "none" }}
                    id="profilePictureInput"
                  />
                </label>
              </div>
              <label
                htmlFor="profilePictureInput"
                style={{
                  display: "block",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                Change Profile
              </label>
              <div className="profileOptions" onClick={handleDashboardClick}>
                <DashboardIcon fontSize="medium" style={{ color: "green" }} />
                <p>Dashboard</p>
              </div>
              <div className="profileOptions" onClick={handleProfileClick}>
                <AccountBoxIcon fontSize="medium" style={{ color: "green" }} />
                <p>Profile</p>
              </div>
              <a href="/login" className="profileOptions">
                {" "}
                {/* Redirect to login page */}
                <ExitToAppIcon fontSize="medium" style={{ color: "green" }} />
                <p>Logout</p>
              </a>
            </div>
          </Card>
        </div>
        <div className="cardTwo">
          <Card style={{ height: "100%" }}>
            {displayedContent === "profile" && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "20px",
                    textAlign: "left",
                    paddingTop: "20px",
                  }}
                >
                  <FormControl style={{ marginBottom: "30px" }}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" value="" readOnly />
                  </FormControl>
                  <FormControl style={{ marginBottom: "30px" }}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" value="" readOnly />
                  </FormControl>
                  <FormControl style={{ marginBottom: "30px" }}>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" value="" readOnly />
                  </FormControl>
                  <FormControl style={{ marginBottom: "30px" }}>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input id="address" value="" readOnly />
                  </FormControl>
                </div>
              </>
            )}
            {displayedContent === "dashboard" && (
              <div className="booking-card" style={{ padding: "20px" }}>
                <h2 style={{ paddingLeft: "20px", textAlign: "left" }}>
                  My Bookings
                </h2>
                {/* Render cards for booking details */}
                <Card style={{ margin: "20px", padding: "20px" }}>
                  {/* Sample booking card */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Vehicle image */}
                      <img
                        src="../image/home.png"
                        alt="Vehicle"
                        style={{
                          width: "200px",
                          height: "150px",
                          marginRight: "20px",
                        }}
                      />
                      <div>
                        {/* Second row: Car number, start date, end date, total price */}
                        <h3>Car Number: ABC123</h3>
                        <p>Start Date: 2024-05-10</p>
                        <p>End Date: 2024-05-15</p>
                        <p>Total Price: $500</p>
                      </div>

                      {/* Third row: Other remaining info */}
                      <div style={{ marginLeft: "10px" }}>
                        <p>Payment Status: Paid</p>
                        <p>From Location: New York</p>
                        <p>To Location: Los Angeles</p>
                      </div>
                    </div>
                  </div>
                </Card>
                {/* You can render more booking cards as needed */}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
