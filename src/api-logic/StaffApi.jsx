const BASE_URL = "http://localhost:3000/staff";

export async function addTheatre(name) {
  const response = await fetch(`${BASE_URL}/theatres`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
}

export async function addAuditorium(data) {
  const response = await fetch(`${BASE_URL}/auditoriums`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function addMovie(data) {
  const response = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
