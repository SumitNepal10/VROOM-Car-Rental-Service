import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all"); // Default filter option

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value, filterOption); // Pass filter option to onSearch
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterOption(value);
    onSearch(searchTerm, value); // Pass search term and filter option to onSearch
  };

  return (
    <>
      <Box display="flex" justifyContent="center" marginTop="50px">
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ width: "400px" }}
        />
        <Select
          value={filterOption}
          onChange={handleFilterChange}
          startAdornment={
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
          }
          style={{ marginLeft: "10px" }}
        >
          <MenuItem value="Model">Model</MenuItem>
          <MenuItem value="Mileage">Mileage</MenuItem>
          <MenuItem value="Rating">Rating</MenuItem>
          <MenuItem value="Price">Price</MenuItem>
        </Select>
      </Box>
    </>
  );
};

export default SearchBar;
