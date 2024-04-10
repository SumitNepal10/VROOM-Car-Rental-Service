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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  // Inline styles that mimic the theme from the screenshot
  const formContainerStyle = {
    backgroundColor: '#f8f9fa', // light gray background
    padding: '40px',
    borderRadius: '8px',
    width: '100%', // Use 100% of the container's width to be responsive within the Bootstrap column
    maxWidth: '600px', // Set a max-width if you want to limit how wide the form can get
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // subtle shadow
    marginLeft: 'auto', // Automatically adjust left margin
    marginRight: 'auto', // Automatically adjust right margin
  };
  

  const labelStyle = {
    display: 'block',
    color: '#495057', // dark gray color for text
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da', // light gray border
  };

  const buttonStyle = {
    backgroundColor: '#dc3545', // red background for the button
    color: 'white',
    padding: '10px 25px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '15px',
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-12 d-flex justify-content-center">
          <div style={formContainerStyle}>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
              {/* Category */}
              <label style={labelStyle}>
                Choose your category
                <select 
                  className="form-select"
                  style={inputStyle}
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
              </label>

              {/* First Name */}
              <label style={labelStyle}>
                First Name
                <input 
                  type="text" 
                  className="form-control" 
                  style={inputStyle}
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </label>

              {/* Last Name */}
              <label style={labelStyle}>
                Last Name
                <input 
                  type="text" 
                  className="form-control" 
                  style={inputStyle}
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </label>

              {/* Email */}
              <label style={labelStyle}>
                Email
                <input 
                  type="email" 
                  className="form-control" 
                  style={inputStyle}
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </label>

              {/* Phone */}
              <label style={labelStyle}>
                Phone
                <input 
                  type="tel" 
                  className="form-control" 
                  style={inputStyle}
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </label>

              {/* Message */}
              <label style={labelStyle}>
                Your Message
                <textarea 
                  className="form-control" 
                  style={inputStyle}
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </label>

              {/* Submit Button */}
              <button type="submit" style={buttonStyle}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
