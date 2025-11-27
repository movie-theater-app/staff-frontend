const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${VITE_BASE_URL}/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Tallennetaan token ja user localStorageen
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data.user; // palautetaan käyttäjätiedot
  } catch (err) {
    throw err;
  }
}

// Logout-funktio
export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}