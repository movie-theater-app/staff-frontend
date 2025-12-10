import React, { useState, useEffect } from "react";
import "../CSS/EditTheatre.css";

// component receives initial theatre values + submit + delete callbacks
export default function EditTheatreForm({ initialData, onSubmit, onDelete }) {
  // main form state: theatre info + dynamically added auditoriums
  const [theatre, setTheatre] = useState({
    theatre_name: "",
    address: "",
    contact_information: "",
    newAuditoriums: [{ name: "", seat_count: "" }],
  });

  // when initialData is received (editing mode), prefill fields with existing values
  useEffect(() => {
    if (initialData) {
      setTheatre(prev => ({
        ...prev, // keep any existing data
        theatre_name: initialData.theatre_name,
        address: initialData.address,
        contact_information: initialData.contact_information,
      }));
    }
  }, [initialData]);
  // text input updates for theatre main fields
  const handleChange = (event) => {
    setTheatre({ ...theatre, [event.target.name]: event.target.value });
  };
  // prevent default page refresh and trigger parent submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit(theatre);
  };
  // handles changes inside auditorium inputs
  const handleAuditoriumChange = (index, event) => {
    const updated = [...theatre.newAuditoriums]; // clones array
    updated[index][event.target.name] = event.target.value; // updates field in correct row
    setTheatre({ ...theatre, newAuditoriums: updated });
  };
  // new empty auditorium row to the form if needed
  const addAuditorium = () => {
    setTheatre({
      ...theatre,
      newAuditoriums: [...theatre.newAuditoriums, { name: "", seat_count: "" }],
    });
  };

 // basic validation: name, address and contact information
 // needs to be filled to enable action buttons 
  const isFormValid =
    theatre.theatre_name.trim() !== "" &&
    theatre.address.trim() !== "" &&
    theatre.contact_information.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="edit-theatre-form">
      <div className="form-field">
        <label>Name:</label>
        <input name="theatre_name" value={theatre.theatre_name} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Address:</label>
        <input name="address" value={theatre.address} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Contact information (phone):</label>
        <input name="contact_information" value={theatre.contact_information} onChange={handleChange} />
      </div>

      <label style={ {
              display: "flex",
              alignItems: "left",
              marginBottom: "1rem"}}
      > Add auditorium(s):</label>
      {theatre.newAuditoriums.map((auditorium, index) => (
        <div key={index} className="auditorium-fields">
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
        </div>
       ))}
       <button type="button" className="btn-add" onClick={addAuditorium}>+ Add auditorium</button>
      <div className="form-actions">
        <button className="btn" 
                type="button" 
                disabled={!isFormValid}
                onClick={() => onSubmit && onSubmit(theatre)}
        > Update theatre</button>
        <button className="btn-remove" 
                type="button" 
                disabled={!isFormValid}
                onClick={() => onDelete && onDelete(theatre)}
        > Delete theatre</button>
      </div> 
    </form>
  );
}
