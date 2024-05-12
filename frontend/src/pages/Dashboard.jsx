import React from "react";
import Appbar from "../components/Appbar";
import { Card, CardContent } from "@mui/material";
import Paper from "@mui/material/Paper";
import Navigation from "../components/Navigation";
import ActivityLog from "../components/ActivityLog";


const cardData = [
  {
    title: "Total Cars",
    value: 250,
    textColor: "#192A53",
    backgroundColor: "#D9EEF7",
  },
  {
    title: "Total Registered Users",
    value: 250,
    textColor: "white",
    backgroundColor: "#5DB75D",
  },
  {
    title: "Active rentals",
    value: 250,
    textColor: "white",
    backgroundColor: "#EDAD4F",
  },
];

const CardComponent = ({ title, value, textColor, backgroundColor }) => (
  <Card
    sx={{
      width: 250,
      height: 100,
      backgroundColor,
      marginLeft: 2,
      marginTop: -30,
    }}
  >
    <CardContent style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div>
        <h style={{ color: textColor, fontSize: "30px", fontWeight: "bold" }}>
          {value}
        </h>
        <p style={{ color: textColor, fontSize: "17px", marginTop: "0px" }}>
          {title}
        </p>
      </div>
    </CardContent>
  </Card>
);



function Dashboard() {
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
        }}
      >
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            value={card.value}
            textColor={card.textColor}
            backgroundColor={card.backgroundColor}
          />
        ))}
      </div>
      
        <ActivityLog />
      
    </>
  );
}

export default Dashboard;
