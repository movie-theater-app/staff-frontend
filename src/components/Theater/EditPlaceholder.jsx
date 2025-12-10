import React from "react";
import placeholderImg from '../assets/placeholder.jpg';
import "../../CSS/EditPlaceholder.css";


export default function TheatrePlaceholder({ theatres, selectedId, setSelectedId }) {
  return (
    <div className="placeholder-container">
      <div className="placeholder-image">
        <img src={placeholderImg} alt="Select a theatre" />
      </div>
      <div className="placeholder-dropdown">
        <select
          value={selectedId || ""}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Select theatre...</option>
          {theatres.map((theater) => (
            <option key={theater.id} value={theater.id}>{theater.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
