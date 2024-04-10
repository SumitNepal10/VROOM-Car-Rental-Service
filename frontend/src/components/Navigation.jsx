import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
  },
});

function Navigation() {
  const [value, setValue] = useState("Home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <header style={{  display: "flex", justifyContent: "space-between" }}>
      <div style={{width:"100%", display: "flex", alignItems: "center" }}>
        <Link to="/" className="logo">
          <img className="home-logo" src="image/logo.png" alt="logo" />
        </Link>
        <Box sx={{ width: "100%" }}>
          <ThemeProvider theme={theme}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab label="Home" value="Home" component={Link} to="/" />
              <Tab
                label="Vehicles"
                value="Vehicles"
                component={Link}
                to="/Vehicles"
              />
              <Tab label="Ride" value="Ride" component={Link} to="/Ride" />
              <Tab label="Services" value="Services" href="#services" />
              <Tab label="Contact" value="Contact" href="#contact" />
             </Tabs>
          </ThemeProvider>
        </Box>
      {/* <div className="header-btn"> */}
        <Link to="sign-up" className="sign-up">
          SignUp
        </Link>
        <Link to="login" className="sign-in">
          Sign In
        </Link>
        {/* </div> */}
      </div>
    </header>
  );
}

export default Navigation;
