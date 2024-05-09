import React from "react";
import Appbar from "../components/Appbar";
import { Card, CardContent} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navigation from "../components/Navigation";

const cardData = [
  {
    title: "Total Cars",
    value: 250,
    textColor: "#192A53",
    backgroundColor: "#D9EEF7",
  },
  {
    title: "Total Registered Users",
    value: 250,
    textColor: "white",
    backgroundColor: "#5DB75D",
  },
  {
    title: "Active rentals",
    value: 250,
    textColor: "white",
    backgroundColor: "#EDAD4F",
  },
];

const CardComponent = ({ title, value, textColor, backgroundColor }) => (
  <Card sx={{ width: 250, height: 100, backgroundColor, marginLeft: 2, marginTop: -15 }}>
    <CardContent style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div>
        <h style={{ color: textColor, fontSize: "30px", fontWeight: "bold" }}>
          {value}
        </h>
        <p style={{ color: textColor, fontSize: "17px", marginTop: "0px" }}>
          {title}
        </p>
      </div>
    </CardContent>
  </Card>
);

function createData(bookingId, renterName, vehicle, date, amount, status) {
  return { bookingId, renterName, vehicle, date, amount, status };
}

const rows = [
  createData(
    "N12345",
    "Harry Potter",
    "SUV Electric",
    "2024-03-19",
    "NPR 4000",
    "Paid"
  ),
  createData(
    "N129",
    "Arya Shrestha",
    "Honda Civic",
    "2024-04-07",
    "NPR 6500",
    "Pending"
  ),
];

function Dashboard() {
  return (
    <>
    <header>
    <Navigation />
    </header>
      <Appbar />
      <div
        className="card-main"
        style={{
          flex: 1,
          display: "flex",
          marginTop: "20px",
        }}
      >
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            value={card.value}
            textColor={card.textColor}
            backgroundColor={card.backgroundColor}
          />
        ))}
      </div>
      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell align="right">Car Renter's Name</TableCell>
                <TableCell align="right">Vehicle</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.bookingId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.bookingId}
                  </TableCell>
                  <TableCell align="right">{row.renterName}</TableCell>
                  <TableCell align="right">{row.vehicle}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    {row.status === "Pending" ? (
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
        </TableContainer>
      </div>
    </>
  );
}

export default Dashboard;
