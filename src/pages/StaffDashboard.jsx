import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/north-star-logo.jpg";
import "../CSS/StaffDashboard.css";
import Navbar from "../components/Navbar";

export default function StaffDashboard() {
  const user = { name: "Test-user" };
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar showLinks={false} />
      <main className="staff-main">
        <h1 >Welcome, {user.name}</h1>
        <h2 style={{marginTop: "5rem"}}>What would you like to do?</h2>

        <div className="button-container">
          <button className="button">Add movie</button>
          <button className="button">Edit movie</button>
          <button className="button" onClick={() => navigate("/add-theatre")}>
            Add theatre
          </button>
          <button className="button">Manage staff</button>
          <button className="button">Statistics</button>
        </div>
      </main>
    </div>

  );
}

