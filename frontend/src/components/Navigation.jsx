import React, { useState } from "react"; // Import useState
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic (clear session, etc.)
    setIsLoggedIn(false); // Update isLoggedIn state
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
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
              <Tab label="About" value="About" component={Link} to="/About" />
              <Tab label="Services" value="Services" href="#services" />
              <Tab label="Contact" value="Contact" href="#contact" />
            </Tabs>
          </ThemeProvider>
        </Box>
        {isLoggedIn ? (
          <div>
            {/* Render user icon when logged in */}
            <img src="user-icon.png" alt="User Icon" />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="header-btn">
            <Link to="sign-up" className="sign-up">
              SignUp
            </Link>
            <Link to="login" className="sign-in">
              SignIn
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;
