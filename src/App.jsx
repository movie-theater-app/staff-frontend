import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CSS/App.css';
import StaffDashboard from "./pages/StaffDashboard";
import AddTheatre from './pages/AddTheatre';

function App() {

  return (
    <Routes>
      <Route path="/" element={<StaffDashboard />} />
      <Route path="/add-theatre" element={<AddTheatre />} />

    </Routes>
  )
}

export default App
