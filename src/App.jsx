import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CSS/App.css';
import StaffDashboard from "./pages/StaffDashboard";
import AddTheatre from './pages/AddTheatre';
import AddMovie from "./pages/AddMovie.jsx";
import ScheduleMovie from "./pages/ScheduleMovie.jsx";
//import SeatMapPage from "./pages/SeatMapPage.jsx";
import EditMovie from "./pages/EditMovie.jsx"
import Login from './pages/LoginView.jsx';
import Logout from "./components/Logout.jsx";


function App() {

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<StaffDashboard />} />
        <Route path="/add-theatre" element={<AddTheatre />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/add-theatre/seat-map/:auditoriumId" element={<AddTheatre showOverlayRoute />} />
        <Route path="/movie/:id/schedule" element={<ScheduleMovie />} />
        <Route path="/edit-movie" element={<EditMovie />} />
    </Routes>
  )
}

export default App
