import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import TaskManager from './TaskManager';
import EmployeeManager from './EmployeeManager';
import './dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="navbar">
          <Link to="/dashboard" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
      <div className="main-content">
        {user && (
          <div>
            {user.role === 'manager' && (
              <>
                <EmployeeManager />
                <TaskManager />
              </>
            )}
            {user.role === 'employee' && <TaskManager />}
          </div>
        )}
      </div>
      <div className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Freelance Site. All rights reserved.</p>
          <p>Developed with ❤ by Raph Sang</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
