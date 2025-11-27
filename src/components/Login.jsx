import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
//import clapboardAnimation from "../assets/clapboard_animation.json";
//import movieLoadingAnimation from "../assets/movie-loading.json"
import ClapperBoard from "../assets/ClapperBoard.json"
import { loginUser } from '../api-logic/authApi'; 
import "../CSS/Login.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const lottieRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginUser(email, password);

      if (lottieRef.current) {
        lottieRef.current.play();
        lottieRef.current.setSpeed(4);
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Staff login</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>

      <div className="animation-box">
        <Lottie
          lottieRef={lottieRef}
          animationData={ClapperBoard}
          loop={false}
          autoplay={false}     
          style={{ width: 320, height: 320, marginRight: "2rem"}}
        />
      </div>
    </div>
  );
}
