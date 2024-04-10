import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import HeroForm from "../components/HeroForm";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <HeroForm />
    </>
  );
}

export default Home;
