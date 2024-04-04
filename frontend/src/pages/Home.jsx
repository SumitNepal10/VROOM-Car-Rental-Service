import React from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import HeroForm from "../components/HeroForm";
import Info from "../components/Info";
import Footer from "../components/Footer";



function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <HeroForm />
      <Info />
      <Footer />
    </>
  );
}

export default Home;
