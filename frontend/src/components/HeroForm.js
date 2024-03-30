import React from "react";

function HeroForm() {
  return (
    <div className="form-container">
      <form action="">
        <div className="input-box">
          <span>Pick up Location</span>
          <input type="search" name="" id="" placeholder="Search Places" />
        </div>
        <div className="input-box">
          <span>Drop-off Location</span>
          <input type="search" name="" id="" placeholder="Search Places" />
        </div>
        <div className="input-box">
          <span>Pick-up Date</span>
          <input type="date" name="" id="" />
        </div>
        <div className="input-box">
          <span>Drop-off Date</span>
          <input type="date" name="" id="" />
        </div>
        <br />
        <button id="submit" type="submit">
          Find a vehicle
        </button>
      </form>
    </div>
  );
}

export default HeroForm;
