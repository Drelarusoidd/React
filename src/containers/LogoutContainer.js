import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../services/auth-context";

const Logout = () => {
    const navigate = useNavigate()
    const { setIsLogin } = useContext(Context)

    const LogoutButton = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsLogin(false)
        return true
    }

    useEffect (() => {
        if (LogoutButton()) {
            navigate('/');
        }
    })
}

export default Logout;
