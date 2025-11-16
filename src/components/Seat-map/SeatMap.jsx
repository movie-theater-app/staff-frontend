import { useState, useEffect } from "react";
import { getSeats, updateSeats } from "../../api-logic/seatApi";
import "../../CSS/SeatMapOverlay.css";
import SelectStatus from "./StatusInfo";
import SeatMapActions from "./SeatMapActions";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa6";


export default function SeatMap({ auditoriumId }) {
  const [seats, setSeats] = useState([]); // stores all auditorium seats
  const [selectedSeats, setSelectedSeats] = useState([]); // stores selected seats
  // stores status changes for seats before submitting with "Save changes"-btn
  const [seatChanges, setSeatChanges] = useState({}); 

  // fetch auditorium data from backend
  const fetchSeats = async () => {
    try {
      const data = await getSeats(auditoriumId);
      setSeats(data); // just seats-array, no other data
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };
  // fetch seats when auditoriumId changes
  useEffect(() => {
    if (auditoriumId) fetchSeats();
  }, [auditoriumId]);

  // toggle seat selection
  const toggleSelect = (seat) => {
    const seatId = `${seat.seat_row}${seat.seat_number}`;

    if (seatChanges[seatId]) {
    const updated = { ...seatChanges };
    delete updated[seatId];
    setSeatChanges(updated);
  }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  // apply new status to selected seaats
  const applyStatusToSelected = (status) => {
  const updated = { ...seatChanges };
  selectedSeats.forEach(id => {
    const currentChange = updated[id]?.newStatus;
    // don't override wheelchiar to be reserved
    if (currentChange === "wheelchair" && status === "reserved") {
      return; // skip
    }
     // and don't override reserved to be wheelchair-status
    if (currentChange === "reserved" && status === "wheelchair") {
      return; 
    }
    updated[id] = { newStatus: status };
  });
  setSeatChanges(updated); // update colors
};

// API-call to backend to save changes on database
const saveChanges = async () => {
  try {
    await updateSeats(auditoriumId, seatChanges);
    setSeatChanges({}); // clear state-changes after saving
    fetchSeats(); // update view again
  } catch (err) {
    console.error(err);
  }
};
  // count rows and max columns for grid layout
  const rows = [...new Set(seats.map(seat => seat.seat_row))]; 
  const maxColumns = Math.max(...seats.map(seat => seat.seat_number || 0));

  return (
    <div>
      <SelectStatus />
      
      <h2>Seat map</h2>
      <div className="seat-map-grid" 
           style={{ gridTemplateColumns: `repeat(${maxColumns}, 40px)` }}>
        {seats.map((seat) => {
          const seatId = `${seat.seat_row}${seat.seat_number}`; // e.g. "A1", "B5"

          let status = seat.status;
          if (seatChanges[seatId]) status = seatChanges[seatId].newStatus;
          else if (selectedSeats.includes(seatId)) status = "selected";

          let seatClass = "seat available";
          if (status === "reserved") seatClass = "seat reserved";
          else if (status === "wheelchair") seatClass = "seat wheelchair";
          else if (status === "selected") seatClass = "seat selected";

          return (
            <div
              key={seatId}
              className={seatClass}
              onClick={() => toggleSelect(seat)}
            >
              {status === "wheelchair" ? <FaWheelchair /> : seatId}
            </div>
          );
        })}
      </div>
       <p style={{
            fontSize: "1rem", 
            marginTop: "2rem", 
            fontWeight: "bold", 
            textAlign: "center", 
            backgroundColor: "white", 
            border: "1px solid green",
            padding: "0.2rem",
            borderRadius: "4px",
            width: `min(${maxColumns * 50}px, 100%)`,
            marginLeft: "auto",
            marginRight: "auto"}}>
          <MdOutlineHorizontalRule /> Screen <MdOutlineHorizontalRule />
        </p>
      <SeatMapActions
        selectedSeats={selectedSeats}
        onReserve={() => applyStatusToSelected("reserved")}
        onReserveWheelchair={() => applyStatusToSelected("wheelchair")}
        onSaveChanges={saveChanges}
      />
    </div>
  );
}
