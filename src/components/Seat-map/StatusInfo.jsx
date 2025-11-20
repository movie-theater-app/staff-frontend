import { FaWheelchair } from "react-icons/fa6";
import "../../CSS/SeatMapOverlay.css";

export default function SelectStatus() {
  return (
    <div className="status-info">
      <div className="status-item">
        <div className="status-box available"></div> = Available
      </div>

      <div className="status-item">
        <div className="status-box reserved"></div> = Reserved
      </div>

      <div className="status-item">
        <div className="status-box selected"></div> = Selected
      </div>

      <div className="status-item">
        <span className="wheelchair-icon">
          <FaWheelchair />
        </span>
        = Wheelchair/disabled seat
      </div>
    </div>
  );
}
