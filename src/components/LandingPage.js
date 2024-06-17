import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css'; // Import CSS file

const LandingPage = () => (
  <div className="landing-page">
    <div className="landing-content">
      <h1>Welcome to Our Company</h1>
      <p>Details about the company.</p>
      <Link to="/login" className="btn">Sign Up/Log In</Link>
    </div>
  </div>
);

export default LandingPage;
