import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Login from "./components/login.jsx";
import Logo from "./components/logo.jsx";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fdf5ec', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ marginTop: "65px" }}>
                <div className="container text-center mt-4">
              <Routes>
    <Route path="/" element={<Logo />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<ProfilePage />} />
</Routes>
            </div>
            </div>

        </div>
    );
}

export default App;