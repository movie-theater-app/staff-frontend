import { useState, useEffect } from "react";
import AddTheatreForm from "../components/Theater/AddTheatreForm";
import Navbar from "../components/Navbar";
import { addTheatre, addAuditorium } from "../api-logic/addTheatreApi";
import { createSeats } from "../api-logic/seatApi";
import SeatMapOverlay from "../components/Seat-map/SeatMapOverlay";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/Confirmation.css";

export default function AddTheatre() {
  const [confirmation, setConfirmation] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [auditoriumId, setAuditoriumId] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.auditoriumId) {
      setAuditoriumId(params.auditoriumId);
    }
  }, [params.auditoriumId]);


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

        // create seats for the auditorium
        await createSeats(added.auditorium.id, Number(auditorium.seat_count));

        createdAuditoriums.push(added.auditorium);
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

  // for viewing seat map of added auditorium
  const handleViewSeats = (auditorium) => {
    setAuditoriumId(auditorium.id);
    setShowOverlay(true);
    //navigate(`/add-theatre/seat-map/${auditorium.id}`);
  };
  // for adding new theatre button
  const handleAddNew = () => setConfirmation(null);
  
  // edit theatre button
  const handleEditTheatre = () => {
    navigate('/edit-theatre');
  }; 

  return (
    <div>
        <Navbar showLinks={true}/>

        {!confirmation && <h1>Add new theatre</h1>}

    {confirmation ? (
      <div className="confirmation">
        {/* LEFT SIDE: success message + btns */}
        <div className="confirmation-content">
          <h2>Theatre added successfully!</h2>

          <div className="confirmation-actions">
            <button className="btn" onClick={handleEditTheatre}>
              Edit theatre
            </button>
            <button className="btn" onClick={handleAddNew}>
              Add new theatre
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: theater info */}
        <div className="confirmation-details">
          <div className="detail-row">
            <h3>Name:</h3>
            <strong>{confirmation.theatre.name}</strong>
          </div>
          <div className="detail-row">
            <h3>Address:</h3>
            <strong>{confirmation.theatre.address}</strong>
          </div>
          <div className="detail-row">
            <h3>Contact (phone):</h3>
            <strong>{confirmation.theatre.contact_information}</strong>
          </div>

          {confirmation.auditoriums.length > 0 && (
            <div className="auditoriums">
              <h3>Auditoriums:</h3>
              <ul>
                {confirmation.auditoriums.map((auditorium, index) => (
                  <li key={index}>
                    {auditorium.name} – {auditorium.seat_count} seats
                    <button
                      className="view-seat-map"
                      onClick={() => handleViewSeats(auditorium)}
                    >
                      Seat map
                    </button>
                  </li>
                ))}
              </ul>

              {showOverlay && (
                <SeatMapOverlay
                  auditoriumId={auditoriumId}
                  onClose={() => {
                    setShowOverlay(false);
                    navigate("/add-theatre");
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    ) : (
      <AddTheatreForm onSubmit={handleSubmit} />
    )}
  </div>
  )
};
