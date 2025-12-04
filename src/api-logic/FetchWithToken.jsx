const BASE_URL = import.meta.env.VITE_BASE_URL;

function getToken() {
  return localStorage.getItem('token');
}

export async function FetchWithToken(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const config = { ...options, headers };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    let data;
     try {
      data = await response.json();
    } catch {
      data = null; // backend doesn't return json
    }
    // when token expired
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = "/";  // force redirect to login
      return;
    }

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `HTTP error ${response.status}`;
      throw new Error(errorMessage)
    }

    return data;
  } catch (err) {
    console.error(`FetchWithToken error on ${endpoint}:`, err);
    throw err;
  }
}
