import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/homepage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Search from "./pages/search.jsx";
import AdminDashboard from "./components/admin/AdminDashboard";
import CreateAd from "./components/CreateAd.jsx";
import ChatPage from "./components/chatpage.jsx";
import PublicProfilePage from "./pages/PublicProfilePage";
function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fdf5ec', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ marginTop: "65px" }}>
                <div className=" text-center mt-4">
                    <Routes>
                        <Route path="/" element={ <ProtectedRoute><Home /> </ProtectedRoute>} />

                        <Route path="/home" element={ <ProtectedRoute><Home /> </ProtectedRoute>} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile/:id" element={<PublicProfilePage />}/>
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>

                        <Route path="/search" element={ <ProtectedRoute><Search /> </ProtectedRoute>} />

                        <Route path="/admin" element={ <AdminRoute><AdminDashboard /> </AdminRoute>} />

                        <Route path="/add-ad" element={ <ProtectedRoute><CreateAd /> </ProtectedRoute>} />

                        <Route path="/chat" element={ <ProtectedRoute><ChatPage /> </ProtectedRoute>} />
                    </Routes>
                </div>
            </div>

        </div>
    );
}

export default App;