import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateAd from "./components/CreateAd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateAd />} />
      <Route path="/create-ad" element={<CreateAd />} />
    </Routes>
  );
}

export default App;