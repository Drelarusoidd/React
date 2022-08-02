import { createContext, useState } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
    const [user, setUser] = useState([])
    const [isLogin, setIsLogin] = useState(false)

    return (
        <Context.Provider value={{user, setUser, isLogin, setIsLogin}}> {children} </Context.Provider>
    );
}

export default Context;
