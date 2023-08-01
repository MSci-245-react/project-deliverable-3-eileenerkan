import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, AppBar, Container, Toolbar, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const MyPage = () => {
  const pages = ['Home', 'Search', 'Review', 'MyPage'];

  const [randomMovie, setRandomMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [watched, setWatched] = useState(null);

  const fetchRandomMovie = async () => {
    try {
      const response = await fetch('/api/randomMovie');
      const data = await response.json();
      setRandomMovie(data);
    } catch (error) {
      console.error('Error fetching random movie:', error.message);
    }
  };

  const fetchMovieRecommendations = async () => {
    try {
      const response = await fetch('/api/movieRecommendation');
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching movie recommendations:', error.message);
    }
  };

  const handleSubmitWatched = async (watchedValue) => {
    setWatched(watchedValue);

    const dataToSend = {
      watched: watchedValue,
      movieName: randomMovie.name,
    };

    try {
      const response = await fetch('/api/watchedMovie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server response:', response.status, text);
        throw new Error(`Server responded with status: ${response.status}, text: ${text}`);
      }
    } catch (error) {
      console.error('Error submitting watch data:', error.message);
      console.error('Full error object:', error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
    fetchMovieRecommendations();
  }, []);

  const StyledButton = styled(Button)({
    backgroundColor: '#ef0086',
    color: 'white',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#d40674',
    },
  });

  return (
    <Grid container spacing={2}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: '20px', justifyContent: 'flex-start', alignItems: 'center' }}>
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
      <Container maxWidth="md">
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome to My Page!
        </Typography>

        {randomMovie && (
          <div>
            <Typography variant="h5" component="h5" gutterBottom>
              Randomly Selected Movie:
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>Name: {randomMovie.name}</Typography>
            <Typography variant="body1" component="p" gutterBottom>Year: {randomMovie.year}</Typography>
            <Typography variant="body1" component="p" gutterBottom>Quality: {randomMovie.quality}</Typography>

            <Typography variant="h6" component="h6" gutterBottom>Have you already watched this movie?</Typography>
            <div style={{ display: 'flex', gap: '10px' }}>
              <StyledButton onClick={() => handleSubmitWatched(true)}>Yes</StyledButton>
              <StyledButton onClick={() => handleSubmitWatched(false)}>No</StyledButton>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <Typography variant="h5" component="h5" gutterBottom>Recommended Movies:</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Average Review Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recommendations.map((movie) => (
                    <TableRow key={movie.id}>
                      <TableCell>{movie.name}</TableCell>
                      <TableCell>{movie.avg_review_score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Container>
    </Grid>
  );
};

export default MyPage;
