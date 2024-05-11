import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Card from "@mui/material/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

function UserDashboard() {
  const [displayedContent, setDisplayedContent] = useState("dashboard");
  const [rentDetails, setRentDetails] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");

        // Fetch user data
        const userResponse = await axios.get(
          `http://localhost:8000/auth/getUser/${username}`
        );
        setUserData(userResponse.data);

        // Fetch data based on displayed content
        if (displayedContent === "dashboard") {
          // Fetch renter details
          const renterResponse = await axios.get(
            `http://localhost:8000/renter/getRenter/${username}`
          );
          const renterData = renterResponse.data;

          // Check if renterData is an array or single object
          if (Array.isArray(renterData)) {
            const updatedRentersData = await Promise.all(
              renterData.map(async (renter) => {
                try {
                  const carResponse = await axios.get(
                    `http://localhost:8000/car/getCarInfo/${renterData.carId}`
                  );
                  const carData = carResponse.data[0];

                  // Calculate total price based on pickup and drop-off dates
                  const startDate = new Date(renter.pickupDate);
                  const endDate = new Date(renter.dropOffDate);
                  const days = Math.ceil(
                    (endDate - startDate) / (1000 * 60 * 60 * 24)
                  );
                  const totalPrice = days * parseFloat(carData.price);

                  return {
                    ...renter,
                    carName: carData.modelName,
                    carImage: carData.picture,
                    totalPrice: totalPrice.toFixed(2),
                  };
                } catch (error) {
                  console.error("Error fetching car details:", error);
                  return null;
                }
              })
            );

            setRentDetails(updatedRentersData.filter(Boolean));
          } else if (typeof renterData === "object") {
            // If renterData is a single object, convert it to an array
            const updatedRenterData = [renterData];
            setRentDetails(updatedRenterData);
          } else {
            console.error("Invalid data format received for renter details");
          }
        } else if (displayedContent === "profile") {
          // Fetch additional profile data if needed
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [displayedContent]);

  const handleProfileClick = () => {
    setDisplayedContent("profile");
  };

  const handleDashboardClick = () => {
    setDisplayedContent("dashboard");
  };

  const handleProfilePictureUpload = () => {
    // pass
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
              <div
                className="profilePictureContainer"
                onClick={handleProfilePictureUpload}
              >
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
              </div>
              <div className="profileOptions" onClick={handleDashboardClick}>
                <DashboardIcon fontSize="medium" style={{ color: "green" }} />
                <p>Dashboard</p>
              </div>
              <div className="profileOptions" onClick={handleProfileClick}>
                <AccountBoxIcon fontSize="medium" style={{ color: "green" }} />
                <p>Profile</p>
              </div>
              <a href="/login" className="profileOptions">
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
                    <Input id="name" value={userData.name} readOnly />
                  </FormControl>
                  <FormControl style={{ marginBottom: "30px" }}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" value={userData.email} readOnly />
                  </FormControl>
                  <FormControl style={{ marginBottom: "30px" }}>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" value={userData.phone} readOnly />
                  </FormControl>
                  {/* <FormControl style={{ marginBottom: "30px" }}>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input id="address" value={userData.address} readOnly />
                  </FormControl> */}
                </div>
              </>
            )}
            {displayedContent === "dashboard" && (
              <div className="booking-card" style={{ padding: "20px" }}>
                <h2 style={{ paddingLeft: "20px", textAlign: "left" }}>
                  My Bookings
                </h2>
                {rentDetails.map((booking, index) => (
                  <Card key={index} style={{ margin: "20px", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {booking.carImage && booking.carImage.contentType && (
                        <div style={{ marginRight: "20px" }}>
                          {/* car image */}
                          <img
                            src={`data:${booking.carImage.contentType};base64,${booking.carImage.data}`}
                            alt="Car"
                            style={{ width: "100px", height: "auto" }}
                          />
                        </div>
                      )}
                      <div>
                        <h3>Car Name: {booking.carName}</h3>
                        <p>Start Date: {booking.pickupDate}</p>
                        <p>End Date: {booking.dropOffDate}</p>
                        <p>Total Price: NPR {booking.totalPrice}</p>{" "}
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <p>
                          Payment Status: {booking.isPaid ? "Paid" : "Unpaid"}
                        </p>
                        <p>From Location: {booking.pickupLocation}</p>
                        <p>To Location: {booking.dropOffLocation}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
