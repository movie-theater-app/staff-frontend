import React from "react";
import logo from "../assets/north-star-logo.jpg";
import "../CSS/Navbar.css";
import { RiHome2Line } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import Profile from "./Profile";

export default function Navbar({ showLinks }) {
  const location = useLocation(); // hook to get current path
  const isRoot = location.pathname === "/"; // check if current path is "/" aka login-page
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header className="staff-header">
      <div className="logo-section">
        <img src={logo} alt="North Star logo" className="logo" />
        {!showLinks && <h1 style={{ marginTop: "3.5rem", marginLeft: "1rem" }}>
          North Star movie theater
        </h1>}
      </div>
      {/* profile button not visible on login page */}
      {!isRoot && (
        <div style={{ marginRight: "5rem" }}>
          <Profile />
        </div>
      )}
      
      {showLinks && (
        <nav className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            <RiHome2Line style={{ fontSize: "2rem" }} />
          </NavLink>
          <NavLink to="/add-movie" className={({ isActive }) => isActive ? "active" : ""}>
            Add movie
          </NavLink>
          <NavLink to="/edit-movie" className={({ isActive }) => isActive ? "active" : ""}>
            Edit movie
          </NavLink>
          <NavLink to="/add-theatre" className={({ isActive }) => isActive ? "active" : ""}>
            Add theatre
          </NavLink>

          {/* admin-only routes */}
          {user.role && (
            <>
              <NavLink to="/manage-staff" className={({ isActive }) => isActive ? "active" : ""}>
                Manage staff
              </NavLink>
              <NavLink to="/statistics" className={({ isActive }) => isActive ? "active" : ""}>
                Statistics
              </NavLink>
            </>
          )}
          </nav>
      )}  
    </header>
  );
}
