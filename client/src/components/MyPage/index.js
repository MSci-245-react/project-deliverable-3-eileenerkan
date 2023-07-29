import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const MyPage = () => {
    const pages = ['Home', 'Search', 'Review', 'Trailers'];

    return (
        <Grid container spacing={2}>
            <AppBar position="static" sx={{backgroundColor: 'black'}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: '40px', justifyContent: 'flex-start', alignItems: 'center'}}>
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
                                marginRight: '15px'
                                }}
                            >
                                {page}
                            </Typography>
                        ))}
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid item xs={12}>
                <Typography variant="h3" component="h3" gutterBottom>
                    Welcome to My Page, here you're able to view trailers of your favourite movies!
                </Typography>
            </Grid>
        </Grid>  
    )
}

export default MyPage;
