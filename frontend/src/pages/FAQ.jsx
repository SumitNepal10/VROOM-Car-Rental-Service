import React, { useState } from 'react';
import Navigation from "../components/Navigation.jsx"
import Footer from "../components/Footer.jsx"

const FAQPage = () => {
  const faqs = [
    { question: 'How do I rent a car?', answer: 'To rent a car, simply browse our selection of vehicles, choose the one that suits your needs, and follow the booking process online or contact our customer service team for assistance.' },
    { question: 'What documents do I need to rent a car?', answer: 'You typically need a valid driver\'s license, proof of insurance, and a credit card for payment. Additional requirements may vary depending on your location and the rental company.' },
    { question: 'Is insurance included in the rental?', answer: 'Basic insurance coverage is often included in the rental price, but you may have the option to purchase additional coverage for added peace of mind. Be sure to check the terms and conditions before booking.' },
    { question: 'Can I rent a car for someone else?', answer: 'Yes, you can rent a car for someone else, but you will need to provide their details during the booking process and ensure they meet all the necessary requirements, such as age and driver\'s license.' },
    { question: 'What happens if I return the car late?', answer: 'Returning the car late may result in additional fees, as most rental companies charge by the day or hour. It\'s best to contact the rental company as soon as possible if you anticipate being late to discuss your options.' },
    // Add more FAQs as needed
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
  <>
    <Navigation/>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>FAQs - Car Rental Services</h1>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            marginBottom: '20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            backgroundColor: activeIndex === index ? '#f0f0f0' : 'transparent',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            onClick={() => toggleAccordion(index)}
          >
            {faq.question} {activeIndex === index ? '-' : '+'}
          </div>
          <div
            style={{
              fontSize: '16px',
              display: activeIndex === index ? 'block' : 'none',
            }}
          >
            {faq.answer}
          </div>
        </div>
      ))}
      
    </div>
    <Footer/>

    
    </>);
};

export default FAQPage;
