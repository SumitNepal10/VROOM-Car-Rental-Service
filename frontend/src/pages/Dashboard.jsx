import React from "react";
import Appbar from "../components/Appbar";
import { Card, CardContent } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  <Card sx={{ width: 250, height: 100, backgroundColor, marginLeft: 2 }}>
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("N12345", "Harry Potter", "SUV Electric", "2024-3-19", "NPR 4000"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Dashboard() {
  return (
    <>
      <Appbar />
      <div
        className="card-main"
        style={{
          flex: 1,
          display: "flex",
          marginTop: "-200px",
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
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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
