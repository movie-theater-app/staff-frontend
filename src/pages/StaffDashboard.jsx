import React from "react";
import logo from "../assets/north-star-logo.jpg";
import "../CSS/StaffDashboard.css";

export default function StaffDashboard() {
  const user = { name: "Test-user" };
   console.log(logo)

  return (
    <div className="page-container">
      <header className="staff-header">
        <div className="logo-section">
          <img src={logo} alt="North Star logo" className="logo"/>
          <h1 style={{marginTop:"3.5rem", marginLeft:"1rem"}}>North Star movie theater</h1>
        </div>
      </header>

      <main className="staff-main">
        <h1 >Welcome, {user.name}</h1>
        <h2 style={{marginTop: "5rem"}}>What would you like to do?</h2>

        <div className="button-container">
          <button className="button">Add movie</button>
          <button className="button">Edit movie</button>
          <button className="button">Manage staff</button>
          <button className="button">Statistics</button>
        </div>
      </main>
    </div>

  );
}

