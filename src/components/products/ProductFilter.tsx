import React, { useState, useEffect } from 'react';
import { TextField, Box, IconButton, InputAdornment } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

interface ProductFilterProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  searchQuery: string;
}

export default function ProductFilter({ onSearch, onClear, searchQuery }: ProductFilterProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    onSearch(localQuery.trim());
  };

  const handleClear = () => {
    setLocalQuery('');
    onClear();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
      <TextField
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search products..."
        variant="outlined"
        sx={{ minWidth: 300, maxWidth: 500 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {localQuery && (
                <IconButton onClick={handleClear} size="small">
                  <Clear />
                </IconButton>
              )}
              <IconButton onClick={handleSearch} color="primary">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}