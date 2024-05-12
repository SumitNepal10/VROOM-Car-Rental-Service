import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsResponse = await axios.get(
          `http://localhost:8000/renter/getRenters`
        );
        const bookingsData = bookingsResponse.data.map((renter, index) => ({
          bookingId: index + 1,
          ...renter,
        }));

        // Fetch car details and price for each booking
        const updatedBookingsData = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              // Fetch car details
              const carResponse = await axios.post(
                `http://localhost:8000/car/getCars`,
                { carIds: [booking.carId] }
              );
              const carName = carResponse.data[0].vehicle;

              // Initialize price to display in case status is false
              let price = "-";

              if (booking.status === true) {
                // If status is true, fetch payment amounts
                const priceResponse = await axios.post(
                  `http://localhost:8000/payment/getAmount`,
                  { carIds: [booking.carId] }
                );
                // Sum up amounts for all carIds with status true
                const totalAmount = priceResponse.data.reduce(
                  (acc, curr) => acc + parseFloat(curr.amount),
                  0
                );
                price = totalAmount;
              }

              return {
                ...booking,
                vehicle: carName,
                price: price,
              };
            } catch (error) {
              console.error("Error fetching booking details:", error);
              return booking;
            }
          })
        );
        setBookings(updatedBookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search query
  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => console.log("Search clicked")}>
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
                <TableCell>Pickup Date</TableCell>
                <TableCell>Dropoff Date</TableCell>
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
                  <TableCell>{booking.pickupDate}</TableCell>
                  <TableCell>{booking.dropOffDate}</TableCell>
                  <TableCell>
                    {booking.status === false ? (
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
