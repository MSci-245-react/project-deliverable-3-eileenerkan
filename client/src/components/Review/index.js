import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Review from './Review';

const MyPage = () => {
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    return (
        <Grid container spacing={2}>
           <AppBar position="static" sx={{ backgroundColor: 'black' }}> 
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
        </Grid>  
    )
}


function App() {
  return (
    <><MyPage /><Review /></>
  ); 
}

export default App;