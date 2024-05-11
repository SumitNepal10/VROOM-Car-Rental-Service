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

  const navItem = [
    { label: "Home", path: "/" },
    { label: "Vehicles", path: "/vehicles" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

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
        <Link to="/" className="logo">
          <img className="home-logo" src="/image/logo.png" alt="logo" />
        </Link>
        <Box sx={{ flex: 1 }}>
          <ThemeProvider theme={theme}>
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
            <span style={{ marginRight: "20px" }}>Welcome, {username}</span>
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
