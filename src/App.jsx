import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Home from "./components/homepage.jsx";
import Search from "./components/search.jsx";

function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fdf5ec', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ marginTop: "65px" }}>
                <div className="container text-center mt-4">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
            </div>

        </div>
    );
}

export default App;