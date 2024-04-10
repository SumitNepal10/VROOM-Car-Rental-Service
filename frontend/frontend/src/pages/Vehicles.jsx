import React from "react";
import Navigation from "../components/Navigation";
import Search from "../components/Search";
import CarList from "../components/CarList";


function Vehicles() {
  return (
    <>
      <Navigation />
      <Search />
      <CarList/>
    </>
  );
}

export default Vehicles;
