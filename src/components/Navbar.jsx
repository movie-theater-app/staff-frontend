import React from "react";
import logo from "../assets/north-star-logo.jpg";
import "../CSS/Navbar.css";
import { RiHome2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function Navbar({ showLinks }) {

  return (
    <header className="staff-header">
      <div className="logo-section">
        <img src={logo} alt="North Star logo" className="logo" />
        {!showLinks && <h1 style={{ marginTop: "3.5rem", marginLeft: "1rem" }}>
          North Star movie theater
        </h1>}
      </div>
      {showLinks && (
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
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
          <NavLink to="/manage-staff" className={({ isActive }) => isActive ? "active" : ""}>
            Manage staff
          </NavLink>
          <NavLink to="/statistics" className={({ isActive }) => isActive ? "active" : ""}>
            Statistics
          </NavLink>
        </nav>
      )}
    </header>
  );
}
