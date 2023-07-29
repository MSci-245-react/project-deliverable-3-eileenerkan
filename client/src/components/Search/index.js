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
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const handleSearch = () => {
    console.log(`Searching for title: ${title}, actor: ${actor}, director: ${director}`);
      
    // Combine the search parameters
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
        setSearchResults(resultsArray); // Save the search results in state
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
      body: JSON.stringify({ query }), // Sending the query 
    });
      
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Search results: ", body);
    return body;
  };

  return (
    <Grid container spacing={2}>
      <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
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
                  color: 'white',
                  marginRight: '15px',
                }}
              >
                {page}
              </Typography>
            ))}
          </Toolbar>
        </Container>
      </AppBar>

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
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </Grid>

      {/* Display Search Results */}
      <Grid item xs={12}>
        {searchResults.length > 0 ? (
          <div>
            <Typography variant="h6" gutterBottom>
              Search Results:
            </Typography>
            <ul>
              {searchResults.map((movie) => (
                <><li key={movie.id}>
                      Movie Name : {movie.name}
                  </li><li key={movie.id}>
                          Movie Year : {movie.year}
                      </li><li key={movie.id}>
                          Movie Quality : {movie.quality}
                      </li></>
              ))}
            </ul>
          </div>
        ) : (
          <Typography variant="body1" gutterBottom>
            No results found.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Search;
