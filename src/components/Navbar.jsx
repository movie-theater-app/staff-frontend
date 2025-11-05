import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/north-star-logo.jpg";
import "../CSS/Navbar.css";
import { RiHome2Line } from "react-icons/ri";

export default function Navbar({ showLinks }) {
  const navigate = useNavigate();

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
            <RiHome2Line style={{ cursor: "pointer", fontSize: "2rem" }}
                         onClick={() => navigate("/")} 
            />
          <button>Add movie</button>
          <button>Edit movie</button>
          <button>Add theatre</button>
        </nav>
      )}
    </header>
  );
}
