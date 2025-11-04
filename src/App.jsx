import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffDashboard from "./pages/StaffDashboard";
import './CSS/App.css'

function App() {

  return (
     <div>
      <StaffDashboard />
    </div>
  )
}

export default App
