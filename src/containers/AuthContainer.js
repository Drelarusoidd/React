import React, { useState, useEffect, useContext } from "react";
import '../App.css';
import { signIn } from "../services/AuthService";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Context from "../services/auth-context";
import { connect } from 'react-redux';
import store from "../store";
import { logined } from "../actions";
import { addUsername } from "../actions";

const AuthContainer = ({dispatch}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const { setUser } = useContext(Context)
    // const { setIsLogin } = useContext(Context)
    const navigate = useNavigate()

    const Auth = async () => {
        await signIn(username, password)
        // setUser(username)
        console.log('before: ')
        console.log(store.getState())
        dispatch(logined)
        dispatch(addUsername(username))
        console.log('after: ')
        console.log(store.getState())
        const token = localStorage.getItem('access');
        // setIsLogin(!!token);
        navigate('/')
    }

    useEffect(() => {
        Auth()
    }, [])

    const handleUsername = (event) => { setUsername(event.target.value) }
    const handlePassword = (event) => { setPassword(event.target.value) }

    return (
        <div className="sign-up">
            <div>
                <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        name="username"
                        value={username}
                        variant="outlined"
                        type="text"
                        onChange={handleUsername}
                    />
                </FormControl>
            </div>
            <div>
                <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        name="password"
                        value={password}
                        variant="outlined"
                        type="password"
                        onChange={handlePassword}
                    />
                </FormControl>
            </div>
            <div>
                <FormControl sx={{ m: 1, width: '30%' }} variant="outlined">
                    <Button variant="contained" color="success" onClick={Auth}>Login</Button>
                </FormControl>
            </div>
        </div>
    );
}

export default connect()(AuthContainer);