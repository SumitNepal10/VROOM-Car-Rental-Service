import React, { useState, useEffect } from "react";
import AppBar from "../components/Appbar"; // Assuming the correct component name
import { Card, CardContent, CardMedia } from "@mui/material";
import Navigation from "../components/Navigation";
import ActivityLog from "../components/ActivityLog";
import axios from "axios";

const CardComponent = ({ title, value, textColor, backgroundColor, image }) => (
  <Card
    sx={{
      width: 250,
      height: 100,
      backgroundColor,
      marginLeft: 2,
      marginTop: -130,
      display: "flex",
      textAlign: "center",
      color: textColor,
    }}
  >
    <CardContent style={{ display: "flex", gap: "50px", alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <CardMedia
          component="img"
          image={image}
          sx={{ width: "50px", height: "50px", margin: "auto" }}
          alt={title} // Provide a descriptive alt text
        />
      </div>
      <div style={{ flex: 3, marginTop: "20px", textAlign: "center" }}>
        <h1
          style={{ fontSize: "30px", marginTop: "-10px", fontWeight: "bold" }}
        >
          {value}
        </h1>
        <p style={{ fontSize: "17px", marginTop: "-20px" }}>{title}</p>
      </div>
    </CardContent>
  </Card>
);

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [carData, setCarData] = useState({});
  const [availableData, setAvailableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, carResponse, availableResponse] =
          await Promise.all([
            axios.get("http://localhost:8000/auth/totalUser"),
            axios.get("http://localhost:8000/car/totalCar"),
            axios.get("http://localhost:8000/car/availableCar"),
          ]);

        setUserData({ totalUsers: userResponse.data });
        setCarData({ totalCars: carResponse.data });
        setAvailableData({ activeRentals: availableResponse.data });

        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div
        className="main-dashboard"
        style={{ height: "700px", overflow: "hidden", marginBottom: "30px" }}
      >
        <header>
          <Navigation />
        </header>
        <AppBar />
        <div
          className="card-main"
          style={{
            flex: 1,
            display: "flex",
            marginTop: "80px",
            marginLeft: "20px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap", // Allow cards to wrap to next line if needed
          }}
        >
          <CardComponent
            title="Total Cars"
            value={carData.totalCars}
            textColor="#192A53"
            backgroundColor="#D9EEF7"
            image="/image/car.png"
          />
          <CardComponent
            title="Total Users"
            value={userData.totalUsers}
            textColor="white"
            backgroundColor="#5DB75D"
            image="/image/team.png"
          />
          <CardComponent
            title="Active Rental"
            value={availableData.activeRentals}
            textColor="white"
            backgroundColor="#EDAD4F"
            image="/image/car-rental.png"
          />
        </div>
        <ActivityLog />
      </div>
    </>
  );
}

export default Dashboard;
