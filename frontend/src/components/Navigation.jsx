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
  const [username, setUsername] = useState("");
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (loggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navItem = [
    { label: "Home", path: "/" },
    { label: "Vehicles", path: "/vehicles" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

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
            <Tabs value={value} onChange={handleChange} textColor="primary">
              {navItem?.map((item, idx) => (
                <Link
                  to={item?.path}
                  key={`nav-item-${idx}`}
                  style={{ color: "black" }}
                >
                  <Tab label={item?.label} onClick={() => setValue(idx)} />
                </Link>
              ))}
            </Tabs>
          </ThemeProvider>
        </Box>

        {isLoggedIn ? (
          <div>
            {/* <img src="image/user-icon.jpg" alt="User Icon" /> */}
            <span>Hello {username}</span>
            <Button className="header-btn" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="header-btn">
            <Link to="/sign-up" className="sign-up">
              SignUp
            </Link>
            <Link to="/login" className="sign-in">
              SignIn
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;
