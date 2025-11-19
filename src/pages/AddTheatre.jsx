import { useState } from "react";
import AddTheatreForm from "../components/AddTheatreForm";
import Navbar from "../components/Navbar";
import { addTheatre, addAuditorium } from "../api-logic/addTheatreApi";
import "../CSS/Confirmation.css";

export default function AddTheatre() {
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = async (data, resetForm) => {
    try {
      // add theatre
      const createdTheatre = await addTheatre({
        name: data.theatre_name,
        address: data.address,
        contact_information: data.contact_information
      })
      console.log('Created theatre:', createdTheatre);

      // add auditoriums
      const createdAuditoriums = [];
      for (const auditorium of data.auditoriums) {
        const added = await addAuditorium({
          theater_id: createdTheatre.id, // backend retuns id in createdTheatre-object
          name: auditorium.name,
          seat_count: auditorium.seat_count
        });
        createdAuditoriums.push(added);
        console.log('Added auditorium:', added);
      }
      
      // Confirmation message and form clearance
      setConfirmation({
        theatre: createdTheatre, 
        auditoriums: createdAuditoriums
      });
      resetForm();  

      } catch (error) {
      console.error("Error adding theatre:", error);
      alert(error.message);
    };
  }
  // for adding new theatre button
  const handleAddNew = () => setConfirmation(null);

  return (
    <div>
        <Navbar showLinks={true}/>

        {!confirmation && (
        <h1 style={{ color: "white", padding: "4rem 0 1rem 0" }}>Add new theatre</h1>
      )}

        {confirmation ? (
        <div className="confirmation">
          <h2>Theatre added successfully!</h2>
          <h3>Name:</h3> <p><strong>{confirmation.theatre.theatre_name}</strong></p>
          <h3>Address:</h3> <p><strong>{confirmation.theatre.address}</strong></p>
          <h3>Contact (phone):</h3><p><strong>{confirmation.theatre.contact_information}</strong></p>

           {confirmation.auditoriums.length > 0 && (
            <div className="auditoriums">
              <h3>Auditoriums:</h3>
              <ul>
                {confirmation.auditoriums.map((auditorium, index) => (
                  <li key={index}>
                    {auditorium.name} – {auditorium.seat_count} seats
                  </li>
                ))}
              </ul>
            </div>
          )}

            <button
              className="btn"
              onClick={() => alert("Edit feature coming soon!")}
            >
              Edit theatre
            </button>
            <button className="btn" onClick={handleAddNew}>Add new theatre</button>
        </div>

      ) : (
        <AddTheatreForm onSubmit={handleSubmit} />
      )}
    </div>
  )
};
