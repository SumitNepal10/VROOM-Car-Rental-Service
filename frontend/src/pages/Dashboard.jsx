import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import { Card, CardContent } from "@mui/material";
import Navigation from "../components/Navigation";
import ActivityLog from "../components/ActivityLog";
import axios from "axios";

const CardComponent = ({ title, value, textColor, backgroundColor }) => (
  <Card
    sx={{
      width: 250,
      height: 150,
      backgroundColor,
      marginLeft: 2,
      marginTop: -130,
      display: "flex",
      textAlign: "center",
      color: textColor,
    }}
  >
    <CardContent>
      <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>{value}</h1>
      <p style={{ fontSize: "17px", marginTop: "0px" }}>{title}</p>
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
      <header>
        <Navigation />
      </header>
      <Appbar />
      <div
        className="card-main"
        style={{
          flex: 1,
          display: "flex",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardComponent
          title="Total Cars"
          value={carData.totalCars}
          textColor="#192A53"
          backgroundColor="#D9EEF7"
        />
        <CardComponent
          title="Total Registered User"
          value={userData.totalUsers}
          textColor="white"
          backgroundColor="#5DB75D"
        />
        <CardComponent
          title="Active Rentals"
          value={availableData.activeRentals}
          textColor="white"
          backgroundColor="#EDAD4F"
        />
      </div>
      <ActivityLog />
    </>
  );
}

export default Dashboard;
