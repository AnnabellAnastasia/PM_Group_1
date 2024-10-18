import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about">
      <div className="content-container">
        <div className="header-section">
          <h1>Who are we?</h1>
          <p className="subtext"><strong>Students, Teachers, & Workers. The Future.</strong></p>
        </div>

        <div className="content-section">
          <p>Text and or paragraph goes here</p>
        </div>
      </div>
    </div>
  );
}

export default About;
