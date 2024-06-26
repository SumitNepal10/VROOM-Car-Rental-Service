import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/activity/getActivity")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        setError(null); 
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <Paper
      elevation={10}
      style={{
        height: "100%",
        width: "70%",
        padding: 20,
        paddingBottom: 40,
        marginLeft: "230px",
        marginTop: "-750px",
        borderRadius: "15px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
        
      }}
    >
      <Typography style={{ paddingLeft: 10, color: "#021F3A" }} variant="h6">
        Activity log
      </Typography>

      {/* Display error message if there's an error */}
      {error && <Typography variant="body1" color="error">{error}</Typography>}

      {/* Activity log table */}
      <TableContainer
        style={{ marginTop: 10, maxHeight: "400px", overflowY: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{activity.username}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>
                  {activity.date && typeof activity.date === "string"
                    ? activity.date
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ActivityLog;
