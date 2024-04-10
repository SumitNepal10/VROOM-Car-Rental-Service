import React, { useState } from "react";
import { Button } from "@mui/material";

function Features() {
  const [isComfortHovered, setComfortHovered] = useState(true); // Set initial state to true
  const [isSafetyHovered, setSafetyHovered] = useState(false);
  const [isValueHovered, setValueHovered] = useState(false);
  const [clickedText, setClickedText] = useState("Comfort"); // Set initial state to "Comfort"

  const handleTextClick = (text) => {
    setClickedText(text);
  };

  return (
    <div className="features">
      <div className="image-about">
        <img className="rental-image" src="image/rental.jpg" alt="rental" />
      </div>
      <div className="list">
        <h style={{ fontSize: "2rem", fontWeight: "bold", color: "grey" }}>
          Quality for clients
        </h>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: "15px",
              color: isComfortHovered ? "red" : "initial",
              cursor: "pointer",
              marginRight: "50px",
            }}
            onMouseEnter={() => setComfortHovered(true)}
            onMouseLeave={() => setComfortHovered(false)}
            onClick={() => handleTextClick("Comfort")}
          >
            {clickedText === "Comfort" ? (
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "red" }}
              >
                {clickedText.toUpperCase()}
              </Button>
            ) : (
              "COMFORT"
            )}
          </span>
          <span
            style={{
              fontSize: "15px",
              color: isSafetyHovered ? "red" : "initial",
              cursor: "pointer",
              marginRight: "50px",
            }}
            onMouseEnter={() => setSafetyHovered(true)}
            onMouseLeave={() => setSafetyHovered(false)}
            onClick={() => handleTextClick("Safety")}
          >
            {clickedText === "Safety" ? (
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "red" }}
              >
                {clickedText.toUpperCase()}
              </Button>
            ) : (
              "SAFETY"
            )}
          </span>
          <span
            style={{
              fontSize: "15px",
              color: isValueHovered ? "red" : "initial",
              cursor: "pointer",
            }}
            onMouseEnter={() => setValueHovered(true)}
            onMouseLeave={() => setValueHovered(false)}
            onClick={() => handleTextClick("Value")}
          >
            {clickedText === "Value" ? (
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "red" }}
              >
                {clickedText.toUpperCase()}
              </Button>
            ) : (
              "VALUE"
            )}
          </span>
        </div>
        <br />
        <br />
        <div>
          {clickedText === "Comfort" && (
            <p style={{ color: "grey", marginRight: "100px" }}>
              Our car rental service puts your comfort first. Our vehicles are
              designed with you in mind, ensuring a smooth and enjoyable ride
              every time you hit the road.
            </p>
          )}
          {clickedText === "Safety" && (
            <p style={{ color: "grey", marginRight: "100px" }}>
              Safety is our top priority. We ensure that all our vehicles are
              regularly maintained and equipped with the latest safety
              features.With us, you are safe every step of the way.
            </p>
          )}
          {clickedText === "Value" && (
            <p style={{ color: "grey", marginRight: "100px" }}>
              Value is our foremost concern. We guarantee that our services
              offer exceptional quality and affordability, ensuring every ride
              provides maximum value for your investment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Features;
