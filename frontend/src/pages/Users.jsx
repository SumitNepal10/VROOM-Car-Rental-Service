import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Appbar from "../components/Appbar";
import Navigation from "../components/Navigation";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/users");
        const usersData = response.data.map((user, index) => ({
          userId: index + 1,
          ...user,
        }));
        setUsers(usersData);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching users");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Navigation />
      <Appbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "24px",
          marginTop: "-250px",
          marginLeft: "60px",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ color: "#3b82f6" }} />
        ) : error ? (
          <Typography variant="h6" color="error" sx={{ color: "#ef4444" }}>
            {error}
          </Typography>
        ) : (
          <Paper
            sx={{
              padding: "24px",
              boxShadow: "0px 6px 12px rgba(0, 0, 0.3, 0.3)",
              width: "60%",
              border: "2px solid #d1d5db",
            }}
          >
            <TextField
              label="Search Users"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon sx={{ color: "#3b82f6" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: "16px",
                width: "60%",
              }}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#475569" }}>User ID</TableCell>
                  <TableCell sx={{ color: "#475569" }}>Username</TableCell>
                  <TableCell sx={{ color: "#475569" }}>Email</TableCell>
                  <TableCell sx={{ color: "#475569" }}>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default Users;
