import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

    const LogoutButton = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return true
    }

    useEffect (() => {
        if (LogoutButton()) {
            navigate('/');
        }
    })
}

export default Logout;
