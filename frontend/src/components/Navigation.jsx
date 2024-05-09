import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
    const index = navItem.findIndex((item) => item.path === currentPath);
    if (index !== -1) {
      setSelectedTab(index);
    }
  }, [currentPath, navItem]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/");
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
              onChange={(e, newValue) => setSelectedTab(newValue)}
              textColor="primary"
              indicatorColor="primary"
            >
              {combinedNavItem.map((item, idx) => (
                <Tab
                  component={Link}
                  to={item.path}
                  key={`nav-item-${idx}`}
                  label={item.label}
                  onClick={() => setSelectedTab(idx)}
                />
              ))}
            </Tabs>
          </ThemeProvider>
        </Box>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {isLoggedIn ? (
            <>
              <span>Hello, {username}</span>
              <Button
                className="header-btn"
                onClick={handleLogout}
                variant="contained"
                color="primary"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/sign-up"
                className="sign-up"
                style={{ marginRight: "10px" }}
              >
                Sign Up
              </Link>
              <Link to="/login" className="sign-in">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
