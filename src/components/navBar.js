import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import MainNavbuttons from './mainNavbuttons';
import Context from '../services/auth-context';
import store from '../store';

function NavBar() {
    // const { user } = useContext(Context)
    // const { isLogin } = useContext(Context)
    const isLogin = store.getState().loginReducer.isLogin
    const user = 'user'

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <MainNavbuttons />
                    {isLogin ?
                        <>
                            <Button component={Link} to="/profile" color="inherit"> {user}'s Profile </Button>
                            <Button component={Link} to="/logout" color="inherit">Logout</Button>
                        </>
                        :
                        <>
                            <Button component={Link} to="/login" color="inherit">Login</Button>
                            <Button component={Link} to="/register" color="inherit">Create account</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default NavBar;
