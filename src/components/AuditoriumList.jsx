import React from "react";
import SeatMap from "./Seat-map/SeatMap";
import { deleteAuditorium } from "../api-logic/editTheatreApi";
import "../CSS/SeatMapOverlay.css";
import "../CSS/SeatMapContainer.css";

export default function AuditoriumList({ auditoriums, setAuditoriums }) {

const handleDeleteAuditorium = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this auditorium?");
    if (!confirmDelete) return;

    try {
      await deleteAuditorium(id);

      // update listing
      setAuditoriums(prev => prev.filter(auditorium => auditorium.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete auditorium");
    }
  };

  return (
    <div className="auditoriums-list">
      {auditoriums.map((auditorium) => (
        <div key={auditorium.id} className="auditorium-item">
          <div className="auditorium-header" 
               style={{ display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'space-between',
               marginTop: "-1rem",
               width: "100%" }}>
            <h3>{auditorium.name} - seat capacity: {auditorium.seat_count} </h3>
            <button 
              onClick={() => handleDeleteAuditorium(auditorium.id)}
              className="btn-remove"
            >
              Delete auditorium
            </button>
          </div>

          <div className="seat-map-container">
            <SeatMap auditoriumId={auditorium.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
