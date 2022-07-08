import React, { useState } from "react";
import '../App.css';
import RegisterService from "../services/RegisterService";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterContainer = () => {

    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const Register = async() => {
        const data = {
            'username': username,
            'firstName': firstName,
            'lastName': lastName,
            'password': password,
            'repeatPassword': repeatPassword,
            'email': email,
            'phone': phone
        }

        await RegisterService(data);
    }

    const handleUsername = (event) => {setUsername(event.target.value)};
    const handleFirstName = (event) => {setFirstName(event.target.value)};
    const handleLastName = (event) => {setLastName(event.target.value)};
    const handlePassword = (event) => {setPassword(event.target.value)};
    const handleRepeatPassword = (event) => {setRepeatPassword(event.target.value)};
    const handleEmail = (event) => {setEmail(event.target.value)};
    const handlePhone = (event) => {setPhone(event.target.value)};

    //TODO render errors
    return (
        <div className="sign-up">
            <div>
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
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
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
                        <TextField 
                            id="outlined-basic" 
                            label="First Name"
                            name="firstName"
                            value={firstName}
                            variant="outlined"
                            type="text"
                            onChange={handleFirstName}
                        />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
                        <TextField 
                            id="outlined-basic" 
                            label="Last Name"
                            name="lastName"
                            value={lastName}
                            variant="outlined"
                            type="text"
                            onChange={handleLastName}
                        />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
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
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
                        <TextField 
                            id="outlined-basic" 
                            label="RepeatPassword"
                            name="repeatPassword"
                            value={repeatPassword}
                            variant="outlined"
                            type="password"
                            onChange={handleRepeatPassword}
                        />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
                        <TextField 
                            id="outlined-basic" 
                            label="Email"
                            name="email"
                            value={email}
                            variant="outlined"
                            type="text"
                            onChange={handleEmail}
                        />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
                        <TextField
                            id="outlined-basic" 
                            label="Phone"
                            name="phone"
                            value={phone}
                            variant="outlined"
                            type="text"
                            onChange={handlePhone}
                        />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth label="fullWidth" id="fullWidth" margin="normal">
                    <Button variant="contained" color="success" onClick={Register}>Register</Button>
                </FormControl>
            </div>
        </div>
    )
}

export default RegisterContainer;