import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MyPage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const pages = ['Home', 'Search', 'Review', 'Trailers'];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container spacing={2}>
            <AppBar position="static" sx={{backgroundColor: 'purple'}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: '40px', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            {pages.map((page) => (
                                <MenuItem onClick={handleClose}>
                                    <Typography
                                        component={Link}
                                        to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                                        variant="button text"
                                        sx={{
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        color: 'black',
                                        marginRight: '15px'
                                        }}
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid item xs={12}>  {/* Add this */}
                <Typography variant="h3" component="h3" gutterBottom>
                    Welcome to My Page, here you're able view trailers of your favourite movies!
                </Typography>
            </Grid>
        </Grid>  
    )
}
export default MyPage;
