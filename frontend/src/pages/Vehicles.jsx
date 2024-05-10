import React, { useState } from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import CarList from "../components/CarList";
import Footer from "../components/Footer";

function Vehicles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setFilterOption(filter);
  };

  return (
    <>
      <Navigation />
      <SearchBar onSearch={handleSearch} />
      <CarList searchTerm={searchTerm} filterOption={filterOption} />
      <Footer />
    </>
  );
}

export default Vehicles;
