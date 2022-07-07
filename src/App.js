import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContainer from './containers/AuthContainer';
import ShowTracks from './components/showTracks'

export default function App (){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AuthContainer/>} />
                <Route path="/track/:pk" element={<ShowTracks/>} />
            </Routes>
        </BrowserRouter>
    );
}
