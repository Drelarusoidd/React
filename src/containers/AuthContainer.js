import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import '../App.css';
import { signIn } from "../services/AuthService";

const AuthContainer = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const Auth = async () => {
       let response = await signIn(username, password)
       let newResponse = jwt_decode(response.access)
       console.log(newResponse)
    }

    const handleUsername = (event) => {setUsername(event.target.value)}
    const handlePassword = (event) => {setPassword(event.target.value)}

    return (
        <div className="sign-up">
            <span>Username:</span>
            <div>
                <input
                    type='text'
                    name='username'
                    value={username}
                    placeholder='Enter your username'
                    size='25'
                    onChange= {handleUsername}
                />
            </div>
            <span>Password: </span>
            <div>
                <input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Enter your password'
                    size='25'
                    onChange = {handlePassword}
                />
            </div>
            <div>
                <button className="button" onClick={Auth}>Login</button>
            </div>
        </div>
    );
}

export default AuthContainer;