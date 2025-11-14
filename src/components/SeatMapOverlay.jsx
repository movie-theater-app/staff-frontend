import "../CSS/SeatMapOverlay.css";
import SeatMap from "./SeatMap";

export default function SeatMapOverlay({ auditoriumId, onClose }) {
  if (!auditoriumId) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <SeatMap auditoriumId={auditoriumId} />
      </div>
    </div>
  );
}
