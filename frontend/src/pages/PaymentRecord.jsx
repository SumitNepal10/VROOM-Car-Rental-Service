import React, { useState } from "react";
import Appbar from "../components/Appbar";
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
      paymentId: 1,
      username: "John Doe",
      paymentDate: "2024-05-01",
      paymentMode: "Credit Card",
      amount: "$50",
    },
    {
      paymentId: 2,
      username: "Jane Smith",
      paymentDate: "2024-05-02",
      paymentMode: "PayPal",
      amount: "$60",
    },
    // Add more data as needed
  ];

  // Filter bookings based on search query
  const filteredBookings = bookingsData.filter(
    (booking) =>
      booking.paymentId.toString().includes(searchQuery) ||
      booking.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.paymentDate.includes(searchQuery) ||
      booking.paymentMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.amount.includes(searchQuery)
  );

  return (
    <>
      <header>
        <Navigation />
      </header>
      <Appbar />
      <div className="payment-table">
        <Paper>
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
            sx={{ marginTop: "-110px", width: "400px" }}
          />
          <Table sx={{ width: "800px", marginTop: "-80px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Payment Mode</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.paymentId}>
                  <TableCell>{booking.paymentId}</TableCell>
                  <TableCell>{booking.username}</TableCell>
                  <TableCell>{booking.paymentDate}</TableCell>
                  <TableCell>{booking.paymentMode}</TableCell>
                  <TableCell>{booking.amount}</TableCell>
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
