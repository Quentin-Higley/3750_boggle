import React, { useEffect } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
    axios.defaults.withCredentials = true;
    return (
        <Routes>
            <Route
                path="/"
                element={<Replace />}
            />

            <Route
                path="/game"
                element={<Game />}
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
