import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/navbar.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/homepage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Search from "./pages/search.jsx";
import AdminDashboard from "./components/admin/AdminDashboard";
import CreateAd from "./components/CreateAd.jsx";
import ChatPage from "./components/chatpage.jsx";

function App() {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#fdf5ec",
                minHeight: "100vh",
            }}
        >
            <Navbar />

            <div style={{ marginTop: "65px" }}>
                <div className="text-center mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/home" element={<Home />} />

                        <Route path="/login" element={<Login />} />

                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />

                        <Route path="/register" element={<Register />} />

                        <Route path="/profile" element={<ProfilePage />} />

                        <Route
                            path="/profile/edit"
                            element={<EditProfile />}
                        />

                        <Route path="/search" element={<Search />} />

                        <Route path="/admin" element={<AdminDashboard />} />

                        <Route path="/add-ad" element={<CreateAd />} />

                        <Route path="/chat" element={<ChatPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;