import React, { useState } from "react";
import '../App.css';
import { signIn } from "../services/AuthService";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AuthContainer = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const Auth = async () => {
       await signIn(username, password)
    }

    const handleUsername = (event) => {setUsername(event.target.value)}
    const handlePassword = (event) => {setPassword(event.target.value)}

    return (
        <div className="sign-up">
            <div>
                <FormControl sx={{m: 0.5, width: '100%' }} variant="outlined">
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
                <FormControl sx={{m: 0.5, width: '100%' }} variant="outlined">
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
                <FormControl sx={{m: 1, width: '30%'}} variant="outlined">
                    <Button variant="contained" color="success" onClick={Auth}>Login</Button>
                </FormControl>
            </div>
        </div>
    );
}

export default AuthContainer;