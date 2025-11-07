import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CSS/App.css';
import StaffDashboard from "./pages/StaffDashboard";
import AddTheatre from './pages/AddTheatre';
import AddMovie from "./pages/AddMovie.jsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<StaffDashboard />} />
      <Route path="/add-theatre" element={<AddTheatre />} />
      <Route path="/add-movie" element={<AddMovie />} />

    </Routes>
  )
}

export default App
