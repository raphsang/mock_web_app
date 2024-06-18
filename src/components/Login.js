import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import CSS file for styling
 {/* creating the login page */}
const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if username and password are not empty
    if (!username || !password) {
      alert('Username and password are required.');
      return;
    }
 {/* here users can login as manager and employee */}
     {/* input any passowrd to login as manager or employee */}
    const userData = {
      id: 1,
      username,
      role: username === 'admin' ? 'admin' : username === 'manager' ? 'manager' : 'employee',
    };
    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Log In</button>
      </form>
    </div>
  );
};

export default Login;
