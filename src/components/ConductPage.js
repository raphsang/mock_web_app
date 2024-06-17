import React from 'react';
import { Link } from 'react-router-dom';
import './ConductPage.css'; // Import CSS file for styling

const ConductPage = () => {
  return (
    <div className="services-page">
      {/* Header Section */}
      <div className="header">
        <div className="navbar">
          <Link to="/dashboard" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link active">Services</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>

      {/* Main Content Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Where To Find Us!</h2>
          <div className="service">
            <h3>Nairobi, Kenya</h3>
            <p>1234 Moi Avenue</p>
          </div>
          <div className="service">
            <h3>Contact</h3>
            <h4>+254716900335</h4>
            <p>https://portfolio-raphsang.vercel.app/</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Freelance Site. All rights reserved.</p>
          <p>Developed with ❤ by Raph Sang</p>
        </div>
      </div>
    </div>
  );
};

export default ConductPage;
