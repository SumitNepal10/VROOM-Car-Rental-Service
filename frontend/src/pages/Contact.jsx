import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ContactForm from '../components/ContactForm';

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <header>
        <Navigation />
      </header>
      <main>
        <ContactForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ContactUs;
