
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; // e.g. http://localhost:3001/api
// authentication helper function
import { FetchWithToken } from './FetchWithToken';

export async function getSeats(auditoriumId) {
  try {
    const response = await FetchWithToken(`/seats/${auditoriumId}`);
    return response;
  } catch (error) {
    console.error(`Error fetching seats for auditorium ${auditoriumId}:`, error);
    throw error;
  }
}

export async function createSeats(auditoriumId, seatCount) {
  try {
    const response = await FetchWithToken(`/seats/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      
      body: JSON.stringify({ auditoriumId, seatCount })
    });
    return response;
  } catch (error) {
    console.error(`Error creating seats for auditorium ${auditoriumId}:`, error);
    throw error;
  }
}
// updates both seat status and type based on changes in the passed object
export async function updateSeats(changes) {
  const requests = [];
  for (const [seatId, change] of Object.entries(changes)) {
    const dbId = change.dbId;
    if (!dbId) continue;

    // update status
    if (change.newStatus === "reserved" || change.newStatus === "available") {
      requests.push(
        FetchWithToken(`/seats/${dbId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: change.newStatus })
        })
      );
    }
    // update seat_type
    if (change.newSeatType === "disabled" || change.newSeatType === "normal") {
      requests.push(
        FetchWithToken(`/seats/${dbId}/type`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seat_type: change.newSeatType })
        })
      );
    }
  }
  return Promise.all(requests);
}
