
import { FetchWithToken } from "./FetchWithToken";

export async function updateTheatre(id, data) {
  try {
    const response = await FetchWithToken(`/theatres/edit/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.error("Error updating theatre:", err);
    throw err;
  }
}

export async function deleteTheatre(id) {
  try {
    const response = await FetchWithToken(`/theatres/edit/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (err) {
    console.error("Error deleting theatre:", err);
    throw err;
  }
}

export async function deleteAuditorium(id) {
  try {
    const response = await FetchWithToken(`/theatres/auditoriums/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error deleting auditorium:", error);
    throw error;
  }
}