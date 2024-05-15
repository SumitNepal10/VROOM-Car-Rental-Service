import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Navigation from "../components/Navigation";
import axios from "axios";

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
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentResponse = await axios.get(
          `http://localhost:8000/payment/getPayments`
        );

        setPayments(
          paymentResponse.data.map((payment, index) => ({
            paymentId: index + 1,
            ...payment,
          }))
        );
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const handleSearch = () => {
    //pass
  };

  // Filter bookings based on search query
  const filteredPayments = payments.filter((payment) =>
    Object.values(payment).some(
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
                  <IconButton onClick={handleSearch}>
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
              {filteredPayments.map((payment) => (
                <TableRow key={payment.paymentId}>
                  <TableCell>{payment.paymentId}</TableCell>
                  <TableCell>{payment.username}</TableCell>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell>{payment.mode}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
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
