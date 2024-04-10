import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className="bottom">
      <div className="footer">
        <div className="about-us" style={{ flex: 1 }}>
          <h2>About Us</h2>
          <p>
            We are Nepal's best vehicle rental company, offering an amazing
            experience in travel. With our services, we have gained trust from
            customers and stand out in this market.
          </p>
        </div>
        <div className="contact-info" style={{ flex: 1 }}>
          <h2>Contact Info</h2>
          <p>
            <LocationOnIcon
              sx={{ color: "red", fontSize: "20px" }}
            ></LocationOnIcon>{" "}
            Naxal, Kathmandu
          </p>
          <p>
            {" "}
            <PhoneIcon sx={{ color: "red", fontSize: "20px" }}></PhoneIcon>{" "}
            01-5672891, 9863829183
          </p>
          <p>
            <MailIcon sx={{ color: "red", fontSize: "20px" }}></MailIcon>{" "}
            vroom@rentalcar.org
          </p>
        </div>
        <div className="quickLinks" style={{ flex: 1 }}>
          <h2>Quick Links</h2>
          <p>About</p>
          <p>Vehicles</p>
          <p>Services</p>
          <p>Contact</p>
        </div>
        <div className="social-network" style={{ flex: 1 }}>
          <h2>Social Network</h2>
          <FacebookIcon></FacebookIcon>
          <InstagramIcon></InstagramIcon>
          <LinkedInIcon></LinkedInIcon>
        </div>
      </div>
      <div className="copyright">
        <p> Copyright 2024 - VroomCarRental</p>
      </div>
    </div>
  );
}

export default Footer;
