import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllTheaters, getTheaterById, getAuditoriumByTheater, getAuditoriums } from "../api-logic/getTheatersApi";
import { updateTheatre, deleteTheatre } from "../api-logic/editTheatreApi";
import { addAuditorium } from "../api-logic/addTheatreApi";
import EditTheatreForm from "../components/Theater/EditTheatreForm";
import AuditoriumList from "../components/Theater/AuditoriumList";
import Navbar from "../components/Navbar";
import "../CSS/EditTheatre.css";
import "../CSS/Form.css";
import "../CSS/SeatMapContainer.css";

export default function EditTheatre() {
  const [theatres, setTheatres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [theatreData, setTheatreData] = useState(null);
  const [auditoriums, setAuditoriums] = useState([]);


  // fetch theaters  
  useEffect(() => {
    async function fetchTheatres() {
      const list = await getAllTheaters();
      setTheatres(list);
    }
    fetchTheatres();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const fetchData = async () => {
      try {
        const theatre = await getTheaterById(selectedId);
        const auditoriums = await getAuditoriumByTheater(selectedId);

        setTheatreData({
          theatre_name: theatre.name,
          address: theatre.address,
          contact_information: theatre.contact_information,
        });
        setAuditoriums(auditoriums);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedId]);

  // updates
  const handleUpdate = async (updatedTheatre) => {
    try {
      await updateTheatre(selectedId, {
        name: updatedTheatre.theatre_name,
        address: updatedTheatre.address,
        contact_information: updatedTheatre.contact_information,
      });
      
      setTheatreData(updatedTheatre); // update UI
      // check if there's auditoriums added
      if (updatedTheatre.newAuditoriums && updatedTheatre.newAuditoriums.length > 0) {
        // in case auditorium field is left null
        const validAuds = updatedTheatre.newAuditoriums.filter(aud => aud.name.trim() !== "" && aud.seat_count !== "");
        const newAuds = [];
        for (const auditorium of validAuds) {
          // go over new auditoriums and send them to backend
          const added = await addAuditorium({
            theater_id: selectedId,
            name: auditorium.name,
            seat_count: Number(auditorium.seat_count),
          });
          newAuds.push(added.auditorium);
        }
        // Update UI of auditoriums list
        // newest auditorium is at the top of list
        setAuditoriums(prev => [...newAuds, ...prev]); 
      }

      alert("Theatre updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update theatre");
    }
  };

  const handleDelete = async () => {
  if (!selectedId) return;
  const confirmDelete = window.confirm("Are you sure you want to delete this theatre?");
  if (!confirmDelete) return;

  try {
    await deleteTheatre(selectedId);
    alert("Theatre deleted");

    // update UI
    setTheatres(prev => prev.filter(theater => theater.id !== Number(selectedId)));
    setSelectedId(null);
    setTheatreData(null);
    setAuditoriums([]);

  } catch (error) {
    console.error(error);
    alert("Failed to delete theatre");
  }
};

  return (
    <div>
      <Navbar showLinks={true} />
      <h1>Edit theatre</h1>
      <div className="edit-theatre-container">
        <div className="left-panel">
          {/* theatre dropdown */}
          <select className="dropdown" value={selectedId || ""} onChange={(event) => setSelectedId(event.target.value)}>
            <option value="">Select theatre...</option>
            {theatres.map(theater => (
              <option key={theater.id} value={theater.id}>{theater.name}</option>
            ))}
          </select>

          {selectedId && theatreData && (
            <EditTheatreForm 
                initialData={theatreData} 
                onSubmit={handleUpdate}
                onDelete={handleDelete} 
            />
          )}
        </div>
        
        <div className="right-panel">
          {selectedId && auditoriums.length > 0 && (
            <>
              <h2>Auditoriums</h2>
              <AuditoriumList auditoriums={auditoriums} setAuditoriums={setAuditoriums} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
