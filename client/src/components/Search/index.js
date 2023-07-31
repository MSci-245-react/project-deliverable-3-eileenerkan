import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MyPage = () => {
  const pages = ['Home', 'Search', 'Review', 'MyPage'];

  const [randomMovie, setRandomMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [watched, setWatched] = useState(null);

  const fetchRandomMovie = () => {
    fetch('/api/randomMovie')
      .then((response) => response.json())
      .then((data) => setRandomMovie(data))
      .catch((error) => console.error('Error fetching random movie:', error.message));
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
      <Grid item xs={12}>
      <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to My Page!
        </Typography>

        {randomMovie && (
          <div>
            <Typography variant="h5" component="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Randomly Selected Movie:
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Name: {randomMovie.name}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Year: {randomMovie.year}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Quality: {randomMovie.quality}
            </Typography>

            <Typography variant="h6" component="h6" gutterBottom>
              Have you already watched this movie?
            </Typography>
            <div style={{ marginBottom: '20px' }}>
              <Button variant="contained" style={{ backgroundColor: '#ef0086' }} onClick={() => handleSubmitWatched(true)}>Yes</Button>
              <Button variant="contained" style={{ backgroundColor: '#ef0086', marginLeft: '10px' }} onClick={() => handleSubmitWatched(false)}>No</Button>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <Typography variant="h5" component="h5" gutterBottom>
              Recommended Movies:
            </Typography>
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
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default MyPage;