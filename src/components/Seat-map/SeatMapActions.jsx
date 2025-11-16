import { FaWheelchair } from "react-icons/fa6";

// This component uses props to receive selectedSeats 
// and callback functions for reserving seats
export default function SeatMapActions({ selectedSeats, onReserve, onReserveWheelchair, onSaveChanges }) {

  if (selectedSeats.length === 0) return null;

  return (
     <div className="seat-actions-wrapper">
      <div className="seat-actions">

        {selectedSeats.length > 0 && (
          <>
            <button className="reserve-btn" onClick={onReserve}>
              Reserve seat(s)
            </button>

            <button className="wheelchair-reserve-btn" onClick={onReserveWheelchair}>
              Reserve as 
              <span 
                style={{backgroundColor: "rgba(255, 255, 255, 0.7)", 
                        color: "black", 
                        borderRadius: "4px", 
                        padding: "3px 5px", 
                        margin: "8px"}}>
                          <FaWheelchair />
              </span>
            </button>
          </>
        )}

      </div>

      <div className="save-changes-wrapper">
        <button className="save-changes-btn" onClick={onSaveChanges}>
          Save changes
        </button>
      </div>
    </div>
  ); 
}
