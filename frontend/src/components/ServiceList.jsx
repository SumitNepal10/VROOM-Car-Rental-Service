import React from "react";

const ServiceTile = ({
  title,
  description,
  imageUrl,
  detailLink,
  btnColor,
}) => {
  const tileStyle = {
    backgroundColor: "#fff", // White background
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // subtle shadow
    margin: "10px",
    display: "flex", // Using flex to keep height consistent
    flexDirection: "column", // Stack elements vertically
    justifyContent: "space-between", // Space between elements
  };

  const imageStyle = {
    width: "500px", // Ensuring the image is responsive
    height: "auto",
    marginBottom: "15px",
    borderRadius: "4px",
  };

  return (
    <div className="col-md-4 d-flex align-items-stretch mb-4">
      <div style={tileStyle}>
        <img src={imageUrl} alt={title} style={imageStyle} />
        <h5>{title}</h5>
        <p>{description}</p>
        <a href={detailLink} className="btn" style={{ color: "red" }}>
          More Details
        </a>
      </div>
    </div>
  );
};

const ServiceList = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <ServiceTile
          title="Products"
          description="Discover products that enhance your rental experience, from GPS units to child booster seats."
          imageUrl="image/products1.png"
          detailLink="/vehicles"
          btnColor="#dc3545" // Redspot red color
        />
        <ServiceTile
          title="Services"
          description="Long term rentals, roadside assistance, and more to ensure a smooth journey."
          imageUrl="image/services.jpg"
          detailLink="/vehicles"
          btnColor="#dc3545"
        />
        <ServiceTile
          title="Coverage Options"
          description="Various coverage options to protect your journey."
          imageUrl="image/coverage.png"
          detailLink="/vehicles"
          btnColor="#dc3545"
        />
      </div>
    </div>
  );
};

export default ServiceList;
