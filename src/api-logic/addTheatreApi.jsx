const BASE_URL = import.meta.env.VITE_BASE_URL;  // backend address

export async function addTheatre(data) {
  try {
    const response = await fetch(`${BASE_URL}/theatres`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // data = name, address, contact_information
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to add theatre");
    }
    return response.json();
  } catch (error) {
    console.error("Network or parsing error in addTheatre:", error);
    throw error;
  }
}
export async function addAuditorium(data) {
  try {
    const response = await fetch(`${BASE_URL}/theatres/auditoriums`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // data = theatre_id, name, seat_count
    });
   if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to add auditorium");
  }
  return response.json();
 } catch (error) {
    console.error("Network or parsing error in addAuditorium:", error);
    throw error;
  }
}
