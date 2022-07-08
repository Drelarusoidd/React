import { BrowserRouter, Routes, Route} from "react-router-dom";
import AuthContainer from './containers/AuthContainer';
import RegisterContainer from "./containers/RegisterContainer";
import ShowTracks from './components/showTracks';
import Logout from './containers/LogoutContainer';

export default function App (){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterContainer/>} />
                <Route path="/login" element={<AuthContainer/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/track/:pk" element={<ShowTracks/>} />
            </Routes>
        </BrowserRouter>
    );
}
