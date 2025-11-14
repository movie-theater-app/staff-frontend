
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; // e.g. http://localhost:3001/api

export async function getSeats(auditoriumId) {
  try {
    const response = await fetch(`${VITE_BASE_URL}/seats/${auditoriumId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching seats for auditorium ${auditoriumId}:`, error);
    throw error;
  }
}

export async function createSeats(auditoriumId, seatCount) {
  try {
    const response = await fetch(`${VITE_BASE_URL}/seats/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auditoriumId, seatCount })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to create seats');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error creating seats for auditorium ${auditoriumId}:`, error);
    throw error;
  }
}
