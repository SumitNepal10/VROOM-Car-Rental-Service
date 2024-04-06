import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

function Appbar() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    console.log("pathname", pathname);
    if (pathname) {
      let activeIdx;
      navItem?.forEach((item, idx) => {
        if (item?.path === pathname) {
          activeIdx = idx;
        }
      });

      setValue(activeIdx);
    }
  }, [pathname]); // Added pathname to the dependency array

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("clicked");
    setValue(newValue);
  };

  const navItem = [
    { label: "Dashboard", path: "/Dashboard" },
    { label: "Cars", path: "/ManageCars" },
    { label: "Bookings", path: "/Bookings" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="app-bar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ backgroundColor: "white", boxShadow: "none" }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon style={{ color: "black" }} />
              </IconButton>
              <h>Dashboard</h>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon style={{ color: "black" }} />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon style={{ color: "black" }} />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  color="inherit"
                >
                  <AccountCircle style={{ color: "black" }} />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton size="large" aria-label="show more" color="inherit">
                  <MoreIcon style={{ color: "black" }} />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="sidebar">
        <div style={{ justifyContent: "center" }}>
          <img
            style={{ marginLeft: "60px", width: "100px" }}
            src="image/logo.png"
            alt="Logo"
          ></img>
        </div>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            marginLeft: "50px",
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="red"
            sx={{
              borderRight: 1,
              marginRight: 50,
              borderColor: "divider",
            }}
          >
            {navItem?.map((item, idx) => (
              <Link
                to={item?.path}
                key={`nav-tem-${idx}`}
                style={{ color: value === idx ? "red" : "black" }} // Dynamic color based on the active tab
              >
                <Tab
                  label={item?.label}
                  onClick={() => setValue(idx)}
                  sx={{  marginRight: "30px" }}
                />
              </Link>
            ))}
          </Tabs>
        </Box>
      </div>
    </div>
  );
}

export default Appbar;
