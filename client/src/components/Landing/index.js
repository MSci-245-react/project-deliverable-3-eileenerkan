import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const Landing = () => {
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    const imageUrl = 'https://w0.peakpx.com/wallpaper/652/689/HD-wallpaper-neon-hot-pink-curves-hot-neon-abstract-pink.jpg'; 

    return (
        <Grid container spacing={2}>
            <AppBar position="static" sx={{ backgroundColor: 'black' }}> {/* Set the AppBar color to black */}
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: '40px', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {pages.map((page) => (
                        <Typography
                            component={Link}
                            to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                            variant="button text"
                            sx={{
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                color: '#ef0086', // Set the text color to #ef0086 for the AppBar links
                                marginRight: '15px'
                            }}
                        >
                            {page}
                        </Typography>
                    ))}
                    </Toolbar>
                </Container>
            </AppBar>
            <div style={{ 
                backgroundImage: `url(${imageUrl})`, // Use the absolute path to the locally downloaded image as the background
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef0086', // Set the text color to #ef0086 for the "Welcome to my Movie Page!" text
                fontSize: '4em', 
                fontStyle: 'italic', 
                fontFamily: 'Satisfy, cursive',
                textTransform: 'uppercase',
            }}>
                <span></span>
            </div>
        </Grid>    
    )
}

export default Landing;
