import React from 'react';
import './Services.css';

function Services() {
  return (
    <div className="services">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
      </div>

      <div className="services-grid">
        <div className="service-item">
          <div className="service-icon strategy-icon"></div>
          <h3>Strategy</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
        </div>

        <div className="service-item">
          <div className="service-icon branding-icon"></div>
          <h3>Branding</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
        </div>

        <div className="service-item">
          <div className="service-icon development-icon"></div>
          <h3>Development</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
        </div>

        <div className="service-item">
          <div className="service-icon webdesign-icon"></div>
          <h3>Web Design</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
        </div>

        <div className="service-item">
          <div className="service-icon socialmedia-icon"></div>
          <h3>Social Media</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
        </div>

        <div className="service-item">
          <div className="service-icon ecommerce-icon"></div>
          <h3>Ecommerce</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
        </div>
      </div>

      <div className="learn-more-container">
        <button className="learn-more">Learn More</button>
      </div>
    </div>
  );
}

export default Services;
