import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function MovieSelection({ movies = [], selectedMovie, handleMovieChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="Movie Selection">Select a movie</InputLabel>
      <Select
        labelId="Movie Selection"
        value={selectedMovie}
        label="Select a movie!"
        displayEmpty
        onChange={handleMovieChange}
      >
        <MenuItem value="">
        </MenuItem>
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.name}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MovieSelection;