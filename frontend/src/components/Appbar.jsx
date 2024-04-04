import React, { useState } from "react";
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
import { Link } from "react-router-dom";

function Appbar() {
  const [value, setValue] = useState(0); // Define state for value

  const handleChange = (event, newValue) => {
    setValue(newValue); // Define function to handle tab change
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

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
                  //   aria-controls={menuId}
                  //   aria-haspopup="true"
                  //   onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle style={{ color: "black" }} />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  //   aria-controls={mobileMenuId}
                  //   aria-haspopup="true"
                  //   onClick={handleMobileMenuOpen}
                  color="inherit"
                >
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
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              sx={{ marginRight: "50px" }}
              label="Dashboard"
              component={Link}
              to="/Dashboard"
            />
            <Tab sx={{ marginRight: "50px" }} label="Cars" />
            <Tab sx={{ marginRight: "50px" }} label="Bookings" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography component="div"></Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography component="div">Cars</Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography component="div">Bookings</Typography>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default Appbar;
