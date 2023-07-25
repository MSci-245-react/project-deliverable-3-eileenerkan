import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';


export const ButtonAppBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor: 'purple'}}>
          <Toolbar>
  
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Button color="inherit">Landing</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

const Search = () => {
  return <h1>This is the Search component</h1>;
};

export default Search;
