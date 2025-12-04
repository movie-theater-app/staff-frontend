import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CSS/App.css';
import StaffDashboard from "./pages/StaffDashboard";
import AddTheatre from './pages/AddTheatre';
import AddMovie from "./pages/AddMovie.jsx";
import ScheduleMovie from "./pages/ScheduleMovie.jsx";
import EditMovie from "./pages/EditMovie.jsx"
import Login from './pages/LoginView.jsx';
import Logout from "./components/Logout.jsx";
import ManageStaff from "./pages/manageStaff.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Statistics from "./pages/Statistics.jsx";


function App() {

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <StaffDashboard />
          </ProtectedRoute>} 
        />
        <Route path="/add-theatre" element={
          <ProtectedRoute>
            <AddTheatre />
          </ProtectedRoute>} 
        />
        <Route path="/add-movie" element={
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>} 
        />
        <Route path="/add-theatre/seat-map/:auditoriumId" element={
          <ProtectedRoute>
            <AddTheatre showOverlayRoute />
          </ProtectedRoute>} 
        />
        <Route path="/movie/:id/schedule" element={
          <ProtectedRoute>
            <ScheduleMovie />
          </ProtectedRoute>} 
        />
        <Route path="/edit-movie" element={
          <ProtectedRoute>
            <EditMovie />
          </ProtectedRoute>} 
        />
        <Route path="/manage-staff" element={
          <ProtectedRoute requireAdmin={true}>
            <ManageStaff/>
          </ProtectedRoute>}
        />
        <Route path="/statistics" element={
          <ProtectedRoute requireAdmin={true}>
            <Statistics />
          </ProtectedRoute>
        } 
      /> 
    </Routes>
  )
}

export default App
