import axios from "axios";
import React, { useState } from "react";
import '../App.css';

const AuthContainer = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const Auth = async () => {
        let formField = new FormData()

        formField.append('username', username)
        formField.append('password', password)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/v1/sign-in/',
            data: formField,
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error.response)
        })
    }

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
                    onChange= {(e) => setUsername(e.target.value)}
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
                    onChange = {(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button className="button" onClick={Auth}>Login</button>
            </div>
        </div>
    );
}

export default AuthContainer;