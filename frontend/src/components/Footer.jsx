import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className="bottom"> {/* Removed fixed positioning here */}
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
            <LocationOnIcon sx={{ verticalAlign: "middle", color: "green", fontSize: "20px" }} />{" "}
            <span style={{ verticalAlign: "middle" }}>Naxal, Kathmandu</span>
          </p>
          <p>
            {" "}
            <PhoneIcon sx={{ verticalAlign: "middle", color: "green", fontSize: "20px" }} />{" "}
            <span style={{ verticalAlign: "middle" }}>01-5672891, 9863829183</span>
          </p>
          <p>
            <MailIcon sx={{ verticalAlign: "middle", color: "green", fontSize: "20px" }} />{" "}
            <span style={{ verticalAlign: "middle" }}>vroom@rentalcar.org</span>
          </p>
          <p style={{ fontWeight: "bold", textTransform: "uppercase", verticalAlign: "middle" }}>ISO CERTIFIED</p>
          {/* Images beneath ISO Certified */}
          <div>
            <img src="../image/iso1.png" alt="Image 1" style={{ width: "100px", height: "100px", marginRight: "10px" }} />
            <img src="../image/iso_2.png" alt="Image 2" style={{ width: "100px", height: "100px", marginRight: "10px" }} />
            <img src="../image/iso_3.png" alt="Image 3" style={{ width: "100px", height: "100px" }} />
          </div>
        </div>
        <div className="quickLinks" style={{ flex: 1 }}>
          <h2>QUICK LINKS</h2>
          <p>ABOUT</p>
          <p>VEHICLES</p>
          <p>SERVICES</p>
          <p>CONTACT</p>
        </div>
        <div className="social-network" style={{ flex: 1 }}>
          <h2>Social Network</h2>
          <FacebookIcon sx={{ verticalAlign: "middle", color: "lightblue", fontSize: "40px" }} />
          <InstagramIcon sx={{ verticalAlign: "middle", color: "lightpink", fontSize: "40px" }} />
          <LinkedInIcon sx={{ verticalAlign: "middle", color: "lightgreen", fontSize: "40px" }} />
          <p style={{ fontWeight: "bold", verticalAlign: "middle", fontSize: "18px" }}>Download</p>
          <img src="../image/appstore.png" alt="Image 3" style={{ width: "120px", height: "40px" }} />
        </div>
      </div>
      <div className="copyright">
        <p> Copyright 2024 - VroomCarRental</p>
      </div>
    </div>
  );
}

export default Footer;
