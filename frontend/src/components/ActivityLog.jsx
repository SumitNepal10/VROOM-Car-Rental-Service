import React from "react";
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

const ActivityLog = ({ activities }) => {
  return (
    <Paper
      elevation={10}
      style={{
        height: "100%",
        width: "70%",
        padding: 20,
        paddingBottom: 40,
        marginLeft: "250px",
        marginTop: "-700px",
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
            {activities &&
              activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.username}</TableCell>
                  <TableCell>
                    {activity.activity_type === "login"
                      ? "Logged in to the system"
                      : activity.activity_type === "logout"
                      ? "Logged out of the system"
                      : activity.activity_type === "rented"
                      ? "Rented a vehicle"
                      : ""}
                  </TableCell>
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

// Sample data
const activities = [
  { username: "user1", activity_type: "login", date: "2024-05-10T08:00:00Z" },
  { username: "user2", activity_type: "logout", date: "2024-05-10T17:00:00Z" },
];

export default () => <ActivityLog activities={activities} />;
