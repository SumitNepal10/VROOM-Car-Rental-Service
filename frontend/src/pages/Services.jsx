import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ServiceList from '../components/ServiceList';

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <header>
        <Navigation />
      </header>
      <main>
        <ServiceList />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ContactUs;
