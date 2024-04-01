import React from "react";

function Search() {
  return (
    <>
    
      <section className="search" id="search">
        <div className="title">
          <h1>
            <span>Car catalogue</span>
            <br />
          </h1>
          <p>Rent a car of your choice</p>
        </div>
      </section>
      <div style={vehiclesContainerStyle}>
        <div style={searchBarStyle}>
          <input
            type="text"
            placeholder="Search vehicles..."
            style={inputStyle}
          />
          {/* Add filter options here */}
          {/* For simplicity, let's assume you have dropdowns for pricing, rating, model, and mileage */}
          <select style={selectStyle}>
            <option value="">Filter by Pricing</option>
            {/* Add pricing options */}
          </select>
          <select style={selectStyle}>
            <option value="">Filter by Rating</option>
            {/* Add rating options */}
          </select>
          <select style={selectStyle}>
            <option value="">Filter by Model</option>
            {/* Add model options */}
          </select>
          <select style={selectStyle}>
            <option value="">Filter by Mileage</option>
            {/* Add mileage options */}
          </select>
        </div>
      </div>
    </>
  );
}
// Define styles

const vehiclesContainerStyle = {
//   borderTop:"00px",
  margin: "200px",
  backgroundColor: "#f0f0f0",
};

const searchBarStyle = {
  marginBottom: "20px",
};

const inputStyle = {
  width: "200px",
  padding: "5px",
  marginRight: "10px",
};

const selectStyle = {
  padding: "5px",
  marginRight: "10px",
};

export default Search;
