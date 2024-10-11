import React, { useContext, useEffect } from 'react';
import { fetchProfile, handleLogOut } from '../../utils/userAPI';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextWrapper';
import './Navbar.css';

const Navbar = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

  useEffect(() => {
			console.log("Nav user", user);
  }, []);

  return (
    <nav className="navbar">
      {/* Left Section (Logo + Name) */}
      <div className="nav-left">
        <img className="logo" src='logo.png' alt="logo" />
        <h3>Niner Network</h3>
      </div>

      {/* Right Section (Links + Profile Icon) */}
      <div className="nav-right">
        <ul className="nav-list">
          <li><h6><a href="/posts" className="nav-link">Home</a></h6></li>
          <li><h6><a href="/about" className="nav-link">About</a></h6></li>
          <li><h6><a href="/services" className="nav-link">Services</a></h6></li>
          <li><h6><a href="/social" className="nav-link">Social</a></h6></li>
          <li><h6><a href="/contact" className="nav-link">Contact</a></h6></li>
          { user.id ?
          <li><h6><span className="nav-link" onClick={(event) => handleLogOut(event, navigate, setUser)}>Logout</span></h6></li>
					:
					<li><h6><a href="/login" className="nav-link">Login</a></h6></li>
					}
        </ul>
				<img src={`../images/${user.image ? user.image : 'blank-profile-picture.png'}`} className="profile-icon" alt=""></img>
      </div>
    </nav>
  );
};

export default Navbar;
