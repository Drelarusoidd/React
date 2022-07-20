import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import { useState, useEffect } from 'react';
import MainNavbuttons from './mainNavbuttons';


export default function NavBar() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    if (isLogin === true) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <MainNavbuttons />
                            <Button component={Link} to="/profile" color="inherit">Profile</Button>
                            <Button component={Link} to="/logout" color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
    else {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <MainNavbuttons />
                            <Button component={Link} to="/login" color="inherit">Login</Button>
                            <Button component={Link} to="/register" color="inherit">Create account</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}
