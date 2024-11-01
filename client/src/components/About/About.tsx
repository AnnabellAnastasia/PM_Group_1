import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about d-flex justify-content-center align-items-center py-4 bg-light">
      <div className="content-container col-md-8 col-12">
        {/* Header Section */}
        <div className="header-section bg-white p-5 text-center rounded shadow-sm mb-4">
          <h1 className="display-4 text-dark">Who are we?</h1>
          <p className="subtext lead text-secondary"><strong>Students, Teachers, & Workers. The Future.</strong></p>
        </div>

        {/* Content Section */}
        <div className="content-section bg-white p-4 text-center rounded shadow-sm">
          <p className="fs-5 text-muted">Text and or paragraph goes here</p>
        </div>
      </div>
    </div>
  );
}

export default About;
