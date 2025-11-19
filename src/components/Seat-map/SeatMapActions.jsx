import { FaWheelchair } from "react-icons/fa6";
import { updateSeats } from "../../api-logic/seatApi";

// This component uses props to receive selectedSeats 
// and callback functions for reserving seats
export default function SeatMapActions({
  seats,
  selectedSeats, // user selected seats
  setSelectedSeats, // setter function for selected seats
  seatChanges, // changes waiting to be saved
  setSeatChanges, // setter function for changes
  onReserve, // callback for reserve btn
  onReserveWheelchair, // callback for "set  seat as disabled" btn
  onSaveChanges, // callback for "save changes" btn
  fetchSeats // callback from SeatMap to refetch data
}) {

  // releases all "reserved" seats and resets wheelchair seats to normal
  const handleReleaseSeats = async () => {
    const changes = {};
    seats.forEach(seat => {
      const seatId = `${seat.row}${seat.number}`;
      if (seat.status === 'reserved') {
        changes[seatId] = { dbId: seat.id, newStatus: 'available' };
      }
      // if seat is a wheelchair seat -> change to normal
      if (seat.seat_type === 'disabled') {
      changes[seatId] = { ...changes[seatId], dbId: seat.id, newSeatType: 'normal' };
    }
    });
     // nothing done if there are no changes
    if (Object.keys(changes).length === 0) return;
     // update seats in backend
    await updateSeats(changes);
      // empty state setters, then refetch seats
    setSeatChanges({});
    setSelectedSeats([]);
    await fetchSeats();
  };
   // checks if there are seats that can be released
  const seatsToRelease = seats.some(seat => 
    seat.status === 'reserved' || seat.seat_type === 'disabled');
    // don't display anything if there are no selected seats or seats to release
  if (selectedSeats.length === 0 && !seatsToRelease) return null;

  return (
    <div className="seat-actions-wrapper">
      <div className="seat-actions">
          {/* Display reserve buttons only when user has selected seats */}
        {selectedSeats.length > 0 && (
          <>
            <button className="reserve-btn" onClick={onReserve}>
              Reserve seat(s)
            </button>

            <button className="wheelchair-reserve-btn" onClick={onReserveWheelchair}>
              Set seat type to 
              <span style={{
                backgroundColor: "rgba(255, 255, 255, 0.51)",
                color: "black",
                borderRadius: "8px",
                padding: "3px 5px",
                margin: "8px"
              }}>
                <FaWheelchair />
              </span>
            </button>
          </>
        )}
      </div>
      {/* Display "Save changes" if user modifies selected seats*/}
      {selectedSeats.length > 0 && (
        <div className="save-changes-wrapper">
          <button className="save-changes-btn" onClick={onSaveChanges}>
            Save changes
          </button>
        </div>
      )}
       {/* Display "Release seat(s)" if auditorium has seats that can be released*/}
      {seatsToRelease && (
        <div className="release-seats-wrapper">
          <button className="release-seats-btn" onClick={handleReleaseSeats}>
            Release seat(s)
          </button>
        </div>
      )}
    </div>
  );
}
