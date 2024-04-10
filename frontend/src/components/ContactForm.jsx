import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <section className="contact-form">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="category" className="form-label">Category</label>
          <select 
            className="form-select" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required
          >
            <option value="">Please select</option>
            <option value="billing">Billing</option>
            <option value="support">Support</option>
            <option value="general">General Inquiry</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="col-12">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input 
            type="tel" 
            className="form-control" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="col-12">
          <label htmlFor="message" className="form-label">Your Message</label>
          <textarea 
            className="form-control" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          ></textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
