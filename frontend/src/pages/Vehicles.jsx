import React from "react";
import Navigation from "../components/Navigation";
import Search from "../components/Search";
import CarList from "../components/CarList";
import Footer from "../components/Footer";




function Vehicles() {
  return (
    <>
      <Navigation />
      <Search />
      <CarList/>
      <Footer />
    </>
  );
}

export default Vehicles;
