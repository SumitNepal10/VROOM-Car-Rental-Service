import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

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
    { label: "Users", path: "/Users" },
    { label: "Payment", path: "/PaymentRecord" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="app-bar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="dynamic"
            sx={{ backgroundColor: "white", boxShadow: "none" }}
          ></AppBar>
        </Box>
      </div>
      <div className="sidebar">
        <div style={{ justifyContent: "center" }}>
          {/* <img
            style={{ marginLeft: "60px", width: "100px" }}
            src="image/logo.png"
            alt="Logo"
          ></img> */}
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
                style={{ color: value === idx ? "red" : "black" }}
              >
                <Tab
                  label={item?.label}
                  onClick={() => setValue(idx)}
                  sx={{ marginRight: "30px" }}
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
