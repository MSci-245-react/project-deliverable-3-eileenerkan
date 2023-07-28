import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const Landing = () => {
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    const imageUrl = "https://media.nbcsandiego.com/2022/05/GettyImages-1271522601.jpg?quality=85&strip=all&resize=1200%2C675"; // URL to your image

    return (
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
            <div style={{ 
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white', 
                fontSize: '4em', 
                fontStyle: 'italic', 
                fontFamily: 'Helvetica Neue',
                backgroundColor: 'lightpink' 
            }}>
                Welcome to my Movie Page!
            </div>
        </Grid>    
    )
}

export default Landing;
