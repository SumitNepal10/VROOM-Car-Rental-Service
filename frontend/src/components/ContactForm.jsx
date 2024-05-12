import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    fullName: "",
    email: "",
    phone: "",
    message: "",
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
    axios
      .post("http://localhost:8000/contact/sendMail", {
        category: formData.category,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      })
      .then((response) => {
        if (response.data.status) {
          alert("mail Sent to user");
        } else {
          alert("please try agian");
        }
      });
  };

  const formContainerStyle = {
    backgroundColor: "#97E7E1",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 0 10px rgba(0.1, 0.1, 0.3, 0.3)",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const labelStyle = {
    display: "block",
    color: "#495057",
    marginBottom: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
  };

  const buttonStyle = {
    backgroundColor: "#0B2447",
    color: "white",
    padding: "10px 25px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "200px",
    marginTop: "15px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
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
                  <option value="billing">Booking</option>
                  <option value="service">Service</option>
                  <option value="support">Customer Support</option>
                  <option value="general">General Inquiry</option>
                </select>
              </label>

              {/* First Name */}
              <label style={labelStyle}>
                Full Name
                <input
                  type="text"
                  className="form-control"
                  style={inputStyle}
                  name="fullName"
                  value={formData.fullName}
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
              <label height="300px" style={labelStyle}>
                Your Message
                <textarea
                  className="form-control"
                  style={{ ...inputStyle, height: "90px" }}
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
