import React, { useEffect } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ResultScreen from "./resultsScreen";
import Lobby from "./lobby";
import GameBoard from "./gameboard";


function App() {
    axios.defaults.withCredentials = true;
    return (
        <Routes>
            <Route
                path="/"
                element={<ResultScreen />}
            />
            <Route
                path="/lobby"
                element={<Lobby />}
            />
            <Route
                path="/gameboard"
                element={<GameBoard />}
            />
            
        </Routes>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
