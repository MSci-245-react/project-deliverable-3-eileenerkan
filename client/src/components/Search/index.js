import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const Search = () => {
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    
    // State for search fields
    const [title, setTitle] = useState('');
    const [actor, setActor] = useState('');
    const [director, setDirector] = useState('');

    const handleSearch = () => {
        console.log(`Searching for title: ${title}, actor: ${actor}, director: ${director}`);
    };
    return(
    <Grid container spacing={2}>
            <AppBar position="static" sx={{backgroundColor: 'purple'}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: '40px', justifyContent: 'flex-start', alignItems: 'center'}}>
                    {pages.map((page) => (
                    <Typography
                        component={Link}
                        to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                        variant="button text"
                        sx={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        color: 'white',
                        marginRight: '15px'
                        }}
                    >
                        {page}
                    </Typography>
                    ))}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Title */}
            <Grid iterm xs = {12}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left',paddingLeft: '18px'}}>
                    Search your movie!
                </Typography>
            </Grid>

            {/* Search Fields */}
            <Grid item xs={12}>
                <TextField 
                    fullWidth 
                    label="Movie Title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    style={{ marginBottom: '20px', width: '70%' }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    fullWidth 
                    label="Actor's Name" 
                    value={actor} 
                    onChange={e => setActor(e.target.value)}
                    style={{ marginBottom: '20px', width: '70%' }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    fullWidth 
                    label="Director's Name" 
                    value={director} 
                    onChange={e => setDirector(e.target.value)}
                    style={{ marginBottom: '20px', width: '70%' }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={handleSearch}>
                    Search
                </Button>
            </Grid>
        </Grid>    
    )
}
export default Search;
