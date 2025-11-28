import Navbar from '../components/Navbar';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar />
      
      <div className="login-wrapper">
        <Login onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
