import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeats } from "../api-logic/seatApi";
import SeatMap from "../components/Seat-map/SeatMap";

export default function SeatMapPage() {
  const { auditoriumId } = useParams();
  const [seats, setSeats] = useState(null);

  useEffect(() => {
    async function fetchSeats() {
      try {
        const data = await getSeats(auditoriumId);
        setSeats(data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    }
    fetchSeats();
  }, [auditoriumId]);

  if (!seats) return <div>No seat data</div>;

  return (
    <div className="seat-map-page">
      <SeatMap seats={seats} auditoriumId={id} />
    </div>
  );
}
