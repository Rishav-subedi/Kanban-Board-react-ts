import React, { useState } from "react";
import { TextField } from '@mui/material';
import "../styles/Search.css"

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the query to the parent component
  };

  return (
    <div className="search-container">
      <TextField
        label="Search Tasks"
        variant="outlined"
        value={query}
        onChange={handleChange}
        fullWidth
        size="small"
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ddd',
            },
            '&:hover fieldset': {
              borderColor: '#00796b',
            },
          },
        }}
      />
    </div>
  );
};

export default Search;
