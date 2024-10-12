import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left Section (Logo + Name) */}
      <div className="nav-left">
        <img className="logo" src='logo.png' alt="logo" />
        <h3>Niner Network</h3>
      </div>

      <div className='nav-Center'>
        <input id="search" className='nav-search' type='text' placeholder='Search'></input>
      </div>

      {/* Right Section (Links + Profile Icon) */}
      <div className="nav-right">
        <ul className="nav-list">
          <li><h6><a href="/" className="nav-link">Home</a></h6></li>
          <li><h6><a href="/about" className="nav-link">About</a></h6></li>
          <li><h6><a href="/services" className="nav-link">Services</a></h6></li>
          <li><h6><a href="/social" className="nav-link">Social</a></h6></li>
          <li><h6><a href="/contact" className="nav-link">Contact</a></h6></li>
        </ul>
        {/* <div className='message-icon'> */}
        <img className='message' src="messageIcon.png" alt="message icon" />
        {/* </div> */}
        <div className="profile-icon">
          {/* Placeholder for Profile Icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
