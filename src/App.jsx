
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Home from "./components/homepage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Search from "./components/search.jsx";
import CreateAd from "./components/CreateAd.jsx";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fdf5ec", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ marginTop: "65px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add-ad" element={<CreateAd />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;