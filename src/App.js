import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContainer from './containers/AuthContainer';
import RegisterContainer from "./containers/RegisterContainer";
import ShowTracks from './components/showTracks';
import Logout from './containers/LogoutContainer';
import NavBar from "./components/navBar";
import { ContextProvider } from "./services/auth-context";
import NewsComponent from "./components/NewsComponent";

export default function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/register" element={<RegisterContainer />} />
                    <Route path="/login" element={<AuthContainer />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/track/:pk" element={<ShowTracks />} />
                    <Route path="/feed/:pk" element={<NewsComponent/>} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    );
}
