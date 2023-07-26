import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const Search = () => {
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    return (
        <Grid container spacing={5}>
            <AppBar position="static" sx={{height: '100px'}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: '40px'}}>
                    {pages.map((page) => (
                    <Typography
                        component={Link}
                        to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                        variant="button text"
                        sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        color: 'white'
                        }}
                    >
                        {page}
                    </Typography>
                    ))}
                    </Toolbar>
                </Container>
            </AppBar>
        </Grid>    
    )
}
export default Search;