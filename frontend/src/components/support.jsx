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
import React from "react";
import { Link } from "react-router-dom";

const ProductsAndServices = () => {
  return (
    <div className="products-and-services">
      <div className="container"/>
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">Products and Services</h1>
          </div>
        </div>
        <div className="row"/>
          <div className="col-md-4"/>
            <div className="product-item"/>
              <img src="/images/products/product-1.jpg" alt="" />
              <div className="product-info">
                