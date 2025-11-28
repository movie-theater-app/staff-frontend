import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // delete token and user info
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // to empty everything
    // localStorage.clear();

    // back to landing page
    navigate('/');
  }, [navigate]);

  return <p>Logging out...</p>;
}
