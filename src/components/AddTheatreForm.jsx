import react from "react";
import { useState } from "react";
import "../CSS/Form.css";

export default function AddTheatreForm({ onSubmit }) {
// form field values are stored and updated, auditoriums stored as array of objects
  const [theatre, setTheatre] = useState({
    theatre_name: "",
    address: "",
    contact_information: "",
    auditoriums: [{ name: "", seat_count: "" }],
  });

  const resetForm = () => {
    setTheatre({
      name: "",
      address: "",
      contact_information: "",
      auditoriums: [{ name: "", seat_count: "" }],
    });
  };

  // updated when user writes to input fields on main level
  const handleChange = (event) => {
    setTheatre({ ...theatre, [event.target.name]: event.target.value });
  };

  // updates auditorium arrays field values, index tracking different auditoriums
  const handleAuditoriumChange = (index, event) => {
    const updated = [...theatre.auditoriums];
    updated[index][event.target.name] = event.target.value;
    setTheatre({ ...theatre, auditoriums: updated });
  };

  // adds new auditorium fields, initially empty
  const addAuditorium = () => {
    setTheatre({
      ...theatre,
      auditoriums: [...theatre.auditoriums, { name: "", seat_count: "" }],
    });
  };
  // deletes auditorium based on index
  // Filter creates new array containing only the elements that satisfy the condition in the callback
  const removeAuditorium = (i) => {
    const updated = theatre.auditoriums.filter((auditorium, index) => index !== i);
    setTheatre({ ...theatre, auditoriums: updated });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // no page refresh
    if (onSubmit) onSubmit(theatre, resetForm);
  };

  // Check that all required fields are filled
  const isFormValid =
    theatre.theatre_name.trim() !== "" &&
    theatre.address.trim() !== "" &&
    theatre.contact_information.trim() !== "" &&
    theatre.auditoriums.length > 0 &&
    theatre.auditoriums.every(
      (auditorium) => auditorium.name.trim() !== "" && auditorium.seat_count.trim() !== ""
    );

  return (
    <div className="add-theatre-form"> 
    <form onSubmit={handleSubmit}>
        <div className="form-field">
            <h3>Name:</h3>
            <input name="theatre_name" placeholder="Theatre name" value={theatre.name} onChange={handleChange} />
        </div>
        <div className="form-field">
            <h3>Address:</h3>
            <input name="address" placeholder="Address" value={theatre.address} onChange={handleChange} />
        </div>
        <div className="form-field">
            <h3>Contact information:</h3>
            <input name="contact_information" placeholder="Contact number" value={theatre.contact_information} onChange={handleChange} />
        </div>
      <h3>Auditoriums:</h3>
      {theatre.auditoriums.map((auditorium, index) => (
        <div key={index} className="auditoriums-section">
          <input
            name="name"
            placeholder="Auditorium name"
            value={auditorium.name}
            onChange={(event) => handleAuditoriumChange(index, event)}
          />
          <input
            name="seat_count"
            placeholder="Seat capacity"
            value={auditorium.seat_count}
            onChange={(event) => handleAuditoriumChange(index, event)}
          />
          {theatre.auditoriums.length > 1 && (
            <button type="button" className="btn-remove" onClick={() => removeAuditorium(index)}>Remove</button>
          )}
        </div>
      ))}
      <button type="button" className="btn-add-auditorium" onClick={addAuditorium}>+ Add auditorium</button>
      <button type="submit" className="btn"  disabled={!isFormValid}>Save theatre</button>
    </form>
    
    </div> 
  );
}
