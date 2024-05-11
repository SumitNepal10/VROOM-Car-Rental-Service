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
  // const history = useHistory();
  // Sample bookings data (replace with your actual data)
  const bookingsData = [
    {
      bookingId: 1,
      rentersName: "John Doe",
      vehicle: "Toyota Camry",
      price: "$50",
      date: "2024-04-10",
      status: "Confirmed",
    },
    {
      bookingId: 2,
      rentersName: "Jane Smith",
      vehicle: "Honda Accord",
      price: "$60",
      date: "2024-04-12",
      status: "Pending",
    },

    // Add more data as needed
  ];

  // Filter bookings based on search query
  const filteredBookings = bookingsData.filter(
    (booking) =>
      booking.bookingId.toString().includes(searchQuery) ||
      booking.rentersName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.date.includes(searchQuery) ||
      booking.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Function to handle view details button click
  // const handleViewDetails = () => {
  //   history.push("/Details");
  // };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <Appbar />
      <div className="bookings-table">
        <Paper style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            width="500px"
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
          <Table sx={{ width: "1000px", marginTop: "-80px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Renter's Name</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell>{booking.bookingId}</TableCell>
                  <TableCell>{booking.rentersName}</TableCell>
                  <TableCell>{booking.vehicle}</TableCell>
                  <TableCell>{booking.price}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    {" "}
                    {booking.status === "Pending" ? (
                      <div
                        style={{
                          backgroundColor: "orange",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Pending
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "green",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Paid
                      </div>
                    )}
                  </TableCell>
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
