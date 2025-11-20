import { useState, useEffect } from "react";
import { getSeats, updateSeats } from "../../api-logic/seatApi";
import "../../CSS/SeatMapOverlay.css";
import SelectStatus from "./StatusInfo";
import SeatMapActions from "./SeatMapActions";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa6";

export default function SeatMap({ auditoriumId }) {
  const [seats, setSeats] = useState([]); // stores all auditorium seat-objects (row, number, seat_type, status, id)
  const [selectedSeats, setSelectedSeats] = useState([]); // stores all selected seats that user clicked
  // stores any temporary seat-object changes before submitting with "Save changes"-btn
  // e.g. { dbId: 12, newStatus: "reserved", newSeatType: "disabled" }
  const [seatChanges, setSeatChanges] = useState({}); 

  // fetch auditorium data from backend
  const fetchSeats = async () => {
    try {
    const data = await getSeats(auditoriumId);

    // check that data is array
    if (!Array.isArray(data)) {
      console.error("Seats data is not an array:", data);
      setSeats([]); // prevent frontend crash by setting empty array
      return;
    }

    setSeats(data); // set fetched seats to state

    // initialize seatChanges with dbId
    const initialChanges = {};
    data.forEach(seat => {
      const seatId = `${seat.row}${seat.number}`;
      initialChanges[seatId] = { dbId: seat.id };
    });
    setSeatChanges(prev => ({ ...initialChanges, ...prev })); // merge with existing changes

  } catch (error) {
    console.error("Error fetching seats:", error);
    setSeats([]); 
  }
};

useEffect(() => {
  if (auditoriumId) fetchSeats();
}, [auditoriumId]);


  // toggle seat selection
  const toggleSelect = (seat) => {
    const seatId = `${seat.row}${seat.number}`;
  // 
    setSeatChanges(prev => {
      const updated = { ...prev };
      // when user clicks again -> remove only temporary changes, but keep dbId
      if (selectedSeats.includes(seatId)) {
        updated[seatId] = { dbId: prev[seatId].dbId };
        // if seat type was changed to wheelchair, reset UI change as well
        setSeats(prevSeats =>
          prevSeats.map(seat =>
            `${seat.row}${seat.number}` === seatId
              ? { ...seat, seat_type: "normal" }
              : seat
          )
        );
      } else {
      updated[seatId] = { dbId: seat.id, ...prev[seatId] };
    }
    return updated;
  });
        
    // toggle selection array
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(key => key !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  // apply new status/type to selected seaats
  const applyStatusToSelected = (change) => {
    const updated = { ...seatChanges };

    selectedSeats.forEach(id => {
      const seat = seats.find((seat) => `${seat.row}${seat.number}` === id);
      if (!seat) return;

      if (change === "reserved") {
        updated[id] = { ...updated[id], newStatus: "reserved" };
      }
      if (change === "wheelchair") {
        updated[id] = { ...updated[id], newStatus: seat.status, newSeatType: "disabled" };

        // UI update, seat is now wheelchair
        setSeats(prev =>
          prev.map(seat =>
            `${seat.row}${seat.number}` === id ? {...seat, seat_type: "disabled"}: seat
          )
        );
      }
    });

    setSeatChanges(updated);
  };
// API-call to backend to save changes on database
const saveChanges = async () => {
  try {
    await updateSeats(seatChanges);
    setSelectedSeats([]);
    await fetchSeats(); // update view again
  } catch (err) {
    console.error(err);
  }
};
  // count rows and max columns for grid layout
  const rows = [...new Set(seats.map(seat => seat.row))]; 
  const maxColumns = Math.max(...seats.map(seat => seat.number || 0));

  return (
    <div>
      <SelectStatus />
      
      <h2>Seat map</h2>
        <div className="seat-map-grid" style={{ gridTemplateColumns: `repeat(${maxColumns}, 40px)` }}>
          {seats.map((seat) => {
            const seatId = `${seat.row}${seat.number}`; 
            const seatChange = seatChanges[seatId] || {};
            const isWheelchair = seatChange.newSeatType === "disabled" || seat.seat_type === "disabled";
            const status = seatChange.newStatus || seat.status;

            let seatClass = "seat available";
            if (status === "reserved") seatClass = "seat reserved";
            else if (selectedSeats.includes(seatId)) seatClass = "seat selected"; 
            if (isWheelchair) seatClass = "seat wheelchair"; 

            const style = {};
            if (selectedSeats.includes(seatId)) {style.border = "4px solid orange"; // selected seat has orange border
            } else if (isWheelchair && status === "available") {style.border = "4px solid green";  // wheelchair available
            } else if (isWheelchair && status === "reserved") {style.border = "4px solid #ce2525"; // wheelchair reserved
            }

            return (
              <div
                key={seatId}
                className={seatClass}
                onClick={() => toggleSelect(seat)}
                style={style}
              >
                {isWheelchair ? <FaWheelchair /> : seatId}
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
        {/* Seat action buttons with props */}
      <SeatMapActions
        seats={seats}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        seatChanges={seatChanges}
        setSeatChanges={setSeatChanges}
        onReserve={() => applyStatusToSelected("reserved")}
        onReserveWheelchair={() => applyStatusToSelected("wheelchair")}
        onSaveChanges={saveChanges}
        fetchSeats={fetchSeats}
      />
    </div>
  );
}
