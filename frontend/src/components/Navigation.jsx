import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    console.log("pathname", pathname);
  }, [pathname]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("clicked");
    setValue(newValue);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Vehicles", path: "/vehicles" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        <Link to="/" className="logo">
          <img className="home-logo" src="image/logo.png" alt="logo" />
        </Link>
        <Box sx={{ width: "100%" }}>
          <ThemeProvider theme={theme}>
            <Tabs value={value} onChange={handleChange} textColor="primary">
              {navItems.map((item, idx) => (
                <Link
                  to={item.path}
                  key={`nav-item-${idx}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Tab label={item.label} onClick={() => setValue(idx)} />
                </Link>
              ))}
            </Tabs>
          </ThemeProvider>
        </Box>

        {isLoggedIn ? (
          <div>
            <img src="user-icon.png" alt="User Icon" />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="header-btn">
            <Link to="/sign-up" className="sign-up" style={{ marginRight: "10px", fontSize: "12px" }}>
              SignUp
            </Link>
            <Link to="/login" className="sign-in" style={{ fontSize: "10px" }}>
              SignIn
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;
