import React, { useEffect } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Lobby from './Lobby'; 

import Login from "./components/login";
import CreateLogin from "./components/createLogin";

function App() {
    axios.defaults.withCredentials = true;
    return (
        <Routes>
            <Route
                path="/lobby" element={<Lobby />}
                // path="/"
                // element={<Login />}
            />
            <Route path='/login' element={<Login/>}/>
            <Route path='/createlogin' element={<CreateLogin/>}/>

{/* 
            <Route
                path="/game"
                element={<Game />}
            /> */}
        </Routes>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
