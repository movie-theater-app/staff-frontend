import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CSS/App.css';
import StaffDashboard from "./pages/StaffDashboard";
import AddTheatre from './pages/AddTheatre';
import AddMovie from "./pages/AddMovie.jsx";
import ScheduleMovie from "./pages/ScheduleMovie.jsx";
import SeatMapPage from "./pages/SeatMapPage";


function App() {

  return (
    <Routes>
        <Route path="/" element={<StaffDashboard />} />
        <Route path="/add-theatre" element={<AddTheatre />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/movie/schedule/:id" element={<ScheduleMovie />} />
        <Route path="/add-theatre/seat-map/:auditoriumId" element={<AddTheatre showOverlayRoute />} />
        <Route path="/movie/:id/schedule" element={<ScheduleMovie />} />
    </Routes>
  )
}

export default App
