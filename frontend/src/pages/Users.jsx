import React, { useState } from "react";
import Appbar from "../components/Appbar";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Bookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const bookingsData = [
    {
      userId: 1,
      username: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
    },
    {
      userId: 2,
      username: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "9876543210",
    },
    // Add more data as needed
  ];

  // Filter bookings based on search query
  const filteredBookings = bookingsData.filter(
    (booking) =>
      booking.userId.toString().includes(searchQuery) ||
      booking.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phoneNumber.includes(searchQuery)
  );

  return (
    <>
      <header>
        <Navigation />
      </header>
      <Appbar />
      <div className="users-table">
        <Paper>
        {/* <h>Users</h> */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{marginTop:"-110px", width:"400px"}}
          />
          <Table sx={{ width: "800px", marginTop:"-80px" }}>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.userId}>
                  <TableCell>{booking.userId}</TableCell>
                  <TableCell>{booking.username}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );
}

export default Bookings;
