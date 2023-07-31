import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const serverURL = "";

const Search = () => {
  const pages = ['Home', 'Search', 'Review', 'MyPage'];

  // State for search fields
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null); // State for error message

  const handleSearch = () => {
    console.log(`Searching for title: ${title}, actor: ${actor}, director: ${director}`);
    if (!title && !actor && !director) {
      setError('Please enter at least one search criteria (Title, Actor, or Director).');
      return;
    }
    const query = {
      title: title,
      actor: actor,
      director: director,
    };
      
    // Call the API with the combined query
    callApiSearchMovies(query)
      .then((searchResults) => {
        const resultsArray = JSON.parse(searchResults.express);
        console.log("Search results:", resultsArray);
        setSearchResults(resultsArray);
        setError(null); // Clear the error
      })
      .catch((error) => {
        console.error("Error searching movies:", error.message);
      });
  };

  const callApiSearchMovies = async (query) => {
    console.log("callApiSearchMovies called");
    const url = serverURL + "/api/searchMovies";
    console.log(url);
      
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
      
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Search results: ", body);
    return body;
  };

  return (
    <Grid container spacing={2}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: '40px', justifyContent: 'flex-start', alignItems: 'center' }}>
            {pages.map((page) => (
              <Typography
                key={page}
                component={Link}
                to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                variant="button text"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: '#ef0086',
                  marginRight: '15px',
                }}
              >
                {page}
              </Typography>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
  
      {/* Error Message */}
      <Grid item xs={12}>
        {error && (
          <Typography variant="body1" color="error" style={{ paddingLeft: '18px' }}>
            {error}
          </Typography>
        )}
      </Grid>
  
      {/* Title */}
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left', paddingLeft: '18px' }}>
          Search your movie!
        </Typography>
      </Grid>
  
      {/* Search Fields */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '20px', width: '70%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Actor's Name"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          style={{ marginBottom: '20px', width: '70%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Director's Name"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          style={{ marginBottom: '20px', width: '70%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" sx={{ backgroundColor: '#ef0086' }} onClick={handleSearch}>
          Search
        </Button>
      </Grid>
  
      {/* Display Search Results */}
      <Grid item xs={12}>
        {searchResults.length > 0 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Search Results:
            </Typography>
            <ul>
              {searchResults.map((movie) => (
                <li key={movie.id}>
                  <p><strong>Movie Name:</strong> {movie.movieTitle}</p>
                  <p><strong>Director:</strong> {movie.directorNames}</p>
                  <p><strong>Actor:</strong> {movie.actorNames}</p>
                  <p><strong>Review Content:</strong> {movie.reviews}</p>
                  <p><strong>Average Ratings:</strong> {movie.avg_review_score}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Grid>
    </Grid>
  );
  
};

export default Search;