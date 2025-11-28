
// authentication helper function
import { FetchWithToken } from './FetchWithToken';
//const BASE_URL = import.meta.env.VITE_BASE_URL;  // backend address

export async function addTheatre(data) {
  try {
    const response = await FetchWithToken(`/theatres`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // data = theatre_name, address, contact_information
    });
    return response;
  } catch (error) {
    console.error("Network or parsing error in addTheatre:", error);
    throw error;
  }
}
export async function addAuditorium(data) {
  try {
    const response = await FetchWithToken(`/theatres/auditoriums`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // data = theatre_id, name, seat_count
    });
  return response;
 } catch (error) {
    console.error("Network or parsing error in addAuditorium:", error);
    throw error;
  }
}

