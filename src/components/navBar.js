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


export default function NavBar() {
    const [isLogin, SetIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            SetIsLogin(true);
        } else {
            SetIsLogin(false);
        }
    }, []);

    if (isLogin === true) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <AudiotrackRoundedIcon /> {/* just a clickable icon. Assign menu items later */} 
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button component={Link} to="/" color="inherit">Musichub</Button>
                        </Typography>
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
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <AudiotrackRoundedIcon />   {/* just a clickable icon. Assign menu items later */}  
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button component={Link} to="/" color="inherit">Musichub</Button>
                        </Typography>
                        <Button component={Link} to="/login" color="inherit">Login</Button>
                        <Button component={Link} to="/register" color="inherit">Create account</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}
