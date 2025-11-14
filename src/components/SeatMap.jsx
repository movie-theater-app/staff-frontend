import { useState, useEffect } from "react";
import { getSeats } from "../api-logic/seatApi";
import "../CSS/SeatMapOverlay.css";

export default function SeatMap({ auditoriumId }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const fetchSeats = async () => {
    try {
      const data = await getSeats(auditoriumId);
      setSeats(data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  useEffect(() => {
    if (auditoriumId) fetchSeats();
  }, [auditoriumId]);

  const toggleSelect = (seat) => {
    if (seat.status === "reserved") return;

    const seatId = `${seat.seat_row}${seat.seat_number}`;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div>
      <h2>Seat map</h2>

      <div className="seat-map-grid">
        {seats.map((seat) => {
          const seatId = `${seat.seat_row}${seat.seat_number}`; // e.g. "A1", "B5"

          let seatClass = "seat available";
          if (seat.status === "reserved") seatClass = "seat reserved";
          else if (selectedSeats.includes(seatId)) seatClass = "seat selected";

          return (
            <div
              key={seatId}
              className={seatClass}
              onClick={() => toggleSelect(seat)}
            >
              {seatId}
            </div>
          );
        })}
      </div>
    </div>
  );
}
