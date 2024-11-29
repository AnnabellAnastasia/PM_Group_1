import React from 'react';
import './Services.css';

function Services() {
  return (
    <div className="services">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Explore how NinerNetworking empowers the UNC Charlotte community through these offerings:</p>
      </div>

      <div className="services-grid">
        {/* Career Mentorship */}
        <div className="service-item">
          <div className="service-icon mentorship-icon"></div>
          <h3>Career Mentorship</h3>
          <p>Connect with experienced alumni and faculty for guidance on your career journey.</p>
        </div>

        {/* Job Opportunities */}
        <div className="service-item">
          <div className="service-icon jobs-icon"></div>
          <h3>Job Opportunities</h3>
          <p>Find internships, part-time roles, and full-time job postings tailored for Niners.</p>
        </div>

        {/* Networking Events */}
        <div className="service-item">
          <div className="service-icon events-icon"></div>
          <h3>Networking Events</h3>
          <p>Attend career fairs, workshops, and exclusive networking events for UNC Charlotte students.</p>
        </div>

        {/* Skill Development */}
        <div className="service-item">
          <div className="service-icon skills-icon"></div>
          <h3>Skill Development</h3>
          <p>Access resources and training programs to improve resume writing, interviews, and more.</p>
        </div>

        {/* Collaboration Projects */}
        <div className="service-item">
          <div className="service-icon projects-icon"></div>
          <h3>Collaboration Projects</h3>
          <p>Partner with peers, alumni, and faculty on real-world projects to enhance your portfolio.</p>
        </div>

        {/* Professional Groups */}
        <div className="service-item">
          <div className="service-icon groups-icon"></div>
          <h3>Professional Groups</h3>
          <p>Join groups based on your major or interests to collaborate and grow your network.</p>
        </div>
      </div>

      <div className="learn-more-container">
        <button className="learn-more">Learn More</button>
      </div>
    </div>
  );
}

export default Services;
