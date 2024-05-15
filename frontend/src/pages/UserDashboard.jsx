import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import Card from "@mui/material/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

function UserDashboard() {
  const [displayedContent, setDisplayedContent] = useState("dashboard");
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    try {
      const username = localStorage.getItem("username");

      // Fetch user data
      const userResponse = await axios.get(
        `http://localhost:8000/auth/getUser/${username}`
      );
      setUserData(userResponse.data);

      // Fetch renter details
      const renterResponse = await axios.get(
        `http://localhost:8000/renter/getRenter/${username}`
      );
      let renterData = renterResponse.data;

      // Convert object response to array with single element
      if (!Array.isArray(renterData)) {
        renterData = [renterData];
      }

      // Fetch car details for each renter
      const carIds = renterData.map((rent) => rent.carId);
      const carResponses = await Promise.all(
        carIds.map((carId) =>
          axios.get(`http://localhost:8000/car/getCarInfo/${carId}`)
        )
      );
      const carData = carResponses.map((response) => response.data);

      // Combine renter and car details into a single object
      const combinedData = renterData.map((rent, index) => ({
        ...rent,
        car: carData[index],
      }));

      // Set bookings with the combined data
      setBookings(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to calculate total price based on pickup and drop-off dates
  const calculateTotalPrice = (pickupDate, dropOffDate, price) => {
    if (!pickupDate || !dropOffDate || !price) return 0;

    // Parse price to a number
    const parsedPrice = parseFloat(price);

    // Convert dates to Date objects
    const pickup = new Date(pickupDate);
    const dropOff = new Date(dropOffDate);

    // Calculate number of days
    const diffTime = Math.abs(dropOff - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate total price
    const totalPrice = parsedPrice * diffDays;
    return totalPrice || 0;
  };

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
                </div>
              </>
            )}
            {displayedContent === "dashboard" && (
              <div className="booking-card" style={{ padding: "20px" }}>
                <h2 style={{ paddingLeft: "20px", textAlign: "left" }}>
                  My Bookings
                </h2>
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <Card
                      key={index}
                      style={{ margin: "20px", padding: "20px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {/* Display car image */}
                        {booking.car.picture && (
                          <div style={{ marginRight: "20px" }}>
                            <img
                              src={`data:${booking.car.picture.contentType};base64,${booking.car.picture.data}`}
                              alt="Car"
                              style={{
                                width: "400px",
                                height: "250px",
                                margin: 2,
                              }}
                            />
                          </div>
                        )}
                        <div>
                          {/* Display car name */}
                          <h3>Car Name: {booking.car.modelName}</h3>
                          <p>Start Date: {booking.pickupDate}</p>
                          <p>End Date: {booking.dropOffDate}</p>
                          {/* Calculate and display total price */}
                          <p>
                            Total Price: NPR{" "}
                            {calculateTotalPrice(
                              booking.pickupDate,
                              booking.dropOffDate,
                              booking.car.price
                            )}
                          </p>{" "}
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
                  ))
                ) : (
                  <p>No bookings found</p>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
