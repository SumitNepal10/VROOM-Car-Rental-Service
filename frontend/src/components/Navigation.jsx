import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Tabs,
  Tab,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
  },
});

function Navigation() {
  const location = useLocation();
  const { pathname } = location;

<<<<<<< HEAD
  useEffect(() => {
    console.log("pathname", pathname);
  }, [pathname]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("clicked");
    setValue(newValue);
  };
=======
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activityData, setActivityData] = useState([]);
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Vehicles", path: "/vehicles" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

<<<<<<< HEAD
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
=======
  const adminItem =
    isLoggedIn && isAdmin ? [{ label: "Dashboard", path: "/dashboard" }] : [];

  const combinedNavItem = [...navItem, ...adminItem];

  useEffect(() => {
    const activeIdx = combinedNavItem.findIndex(
      (item) => item.path === pathname
    );
    if (activeIdx !== -1) {
      setSelectedTab(activeIdx);
    }
  }, [pathname, combinedNavItem]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);

    const currentDate = new Date();
    const date = currentDate.toISOString();
    const activity = "User logged out of the system";

    // Construct activity object
    const newActivity = {
      username,
      activity,
      date,
    };

    setActivityData((prevActivityData) => [...prevActivityData, newActivity]);

    // Send activityData to the server
    axios.post("http://localhost:8000/activity/addActivity", {
      activityData: newActivity,
    });
  };

  const handleChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
        <Link to="/" className="logo">
          <img className="home-logo" src="/image/logo.png" alt="logo" />
        </Link>
        <Box sx={{ flex: 1 }}>
          <ThemeProvider theme={theme}>
<<<<<<< HEAD
            <Tabs value={value} onChange={handleChange} textColor="primary">
              {navItems.map((item, idx) => (
                <Link
                  to={item.path}
                  key={`nav-item-${idx}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Tab label={item.label} onClick={() => setValue(idx)} />
=======
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              textColor="primary"
            >
              {combinedNavItem.map((item, idx) => (
                <Link
                  to={item.path}
                  key={`nav-item-${idx}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Tab label={item.label} />
>>>>>>> 87dc5e623083ed613e14b42b8e7c2a40771aa7d4
                </Link>
              ))}
            </Tabs>
          </ThemeProvider>
        </Box>

        {isLoggedIn ? (
          <div>
            <IconButton
              aria-label="profile-menu"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar alt="Profile" />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              style={{ marginRight: "20px" }}
            >
              <MenuItem
                component={Link}
                to={isAdmin ? "/dashboard" : "/UserDashboard"}
                onClick={handleMenuClose}
              >
                {isAdmin ? "Admin Dashboard" : "User Dashboard"}
              </MenuItem>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <span style={{ marginRight: "20px" }}>{username}</span>
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
