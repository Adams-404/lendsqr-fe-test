import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import logo from '../../assets/logo.svg';
import illustration from '../../assets/pablo-sign-in.svg';
import './Login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - accept any credentials
    storage.setAuthState(true);
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="login-page__logo">
          <img src={logo} alt="Lendsqr Logo" />
        </div>
        <div className="login-page__illustration">
          <img src={illustration} alt="Login Illustration" />
        </div>
      </div>
      
      <div className="login-page__right">
        <div className="login-page__form-container">
          <h1 className="login-page__title">Welcome!</h1>
          <p className="login-page__subtitle">Enter details to login.</p>
          
          <form className="login-page__form" onSubmit={handleSubmit}>
            <div className="login-page__input-group">
              <input
                type="email"
                className="login-page__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="login-page__input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-page__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-page__show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            <a href="#" className="login-page__forgot-link">
              Forgot Password?
            </a>
            
            <button type="submit" className="login-page__submit-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
