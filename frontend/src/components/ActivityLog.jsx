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

  useEffect(() => {
    fetch("http://localhost:8000/activity/getActivity")
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error("Error fetching activities:", error));
  }, []);

  return (
    <Paper
      elevation={10}
      style={{
        height: "100%",
        width: "70%",
        padding: 20,
        paddingBottom: 40,
        marginLeft: "250px",
        marginTop: "-800px",
        borderRadius: "15px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      <Typography style={{ paddingLeft: 10, color: "#021F3A" }} variant="h6">
        Activity log
      </Typography>

      {/* Activity log table */}
      <TableContainer style={{ marginTop: 10 }}>
        <Table>
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
