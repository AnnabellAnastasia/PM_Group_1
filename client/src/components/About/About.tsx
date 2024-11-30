import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about d-flex justify-content-center align-items-center py-4 bg-light">
      <div className="content-container col-md-8 col-12">
        {/* Who Are We Section */}
        <div className="header-section bg-white p-5 text-center rounded shadow-sm mb-4">
        <h1 className="display-4 text-dark">Who are we?</h1>
        <p className="subtext lead text-secondary">
          <span>Students, Teachers, & Workers.</span>
          <br />
          <span>The Future.</span>
        </p>
        <p className="fs-5 text-muted">
          NinerNetworking is a professional networking platform exclusively for UNC Charlotte students, alumni, faculty, and staff. Our goal is to bridge the gap between education and career by fostering connections, mentorship, and collaboration within the Niner community.
        </p>
      </div>


        {/* Our Mission Section */}
        <div className="mission-section bg-white p-5 text-center rounded shadow-sm mb-4">
          <h2 className="display-6 text-dark">Our Mission</h2>
          <p className="fs-5 text-muted">
            Empowering Niners to build meaningful relationships, discover opportunities, and achieve their professional aspirations.
          </p>
        </div>

        {/* Why NinerNetworking Section */}
        <div className="why-section bg-white p-5 text-center rounded shadow-sm">
          <h2 className="display-6 text-dark">Why NinerNetworking?</h2>
          <ul className="fs-5 text-muted list-unstyled">
            <li><strong>Exclusive Community:</strong> Connect with peers, alumni, and professors who understand your journey as a 49er.</li>
            <li><strong>Career Growth:</strong> Find internships, job opportunities, and mentors to guide you in your field.</li>
            <li><strong>Stay Connected:</strong> Keep in touch with the Niner family even after graduation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
