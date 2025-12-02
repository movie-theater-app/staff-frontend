const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${VITE_BASE_URL}/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}` -- not needed for login, it's created during
      },
      body: JSON.stringify({ email, password }),
    });

    // tries to read json reponse from backend -> if not json, sets data as empty object and prevents crash
    let data;
    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save token and user to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data.user; // return user info 
  } catch (err) {
    throw err;
  }
}

// Logout-function clears local storage immediately, but token is stored for 2h if app is open
export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}