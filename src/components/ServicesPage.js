import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css'; // Import CSS file for styling

const ServicesPage = () => {
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
          <h2>Our Services</h2>
          <div className="service">
            <h3>Web Development</h3>
            <p>We offer custom web development services tailored to your needs.</p>
          </div>
          <div className="service">
            <h3>Graphic Design</h3>
            <p>High-quality graphic design services for digital and print media.</p>
          </div>
          <div className="service">
            <h3>Content Writing</h3>
            <p>Engaging and SEO-friendly content writing services.</p>
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

export default ServicesPage;
