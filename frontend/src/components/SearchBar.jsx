import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Model");

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term, filterOption);
    }
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilterOption(filter);
    if (onSearch) {
      onSearch(searchTerm, filter); 
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="20px">
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon /> {}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Select
        value={filterOption} // Current filter option
        onChange={handleFilterChange} 
        startAdornment={ 
          <InputAdornment position="start">
            <FilterListIcon />
          </InputAdornment>
        }
      >
        <MenuItem value="Model">Model</MenuItem>
        <MenuItem value="Price">Price</MenuItem>
      </Select>
    </Box>
  );
}

export default SearchBar;
