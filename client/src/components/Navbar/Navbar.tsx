import React, { useContext, useEffect, useState, useRef } from 'react';
import { fetchProfile, handleLogOut } from '../../utils/userAPI';
import { useNavigate } from 'react-router-dom';
import { AlertContext, UserContext } from '../ContextWrapper';
import ChatModal from "../Chat/ChatRoom";
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { pageAlert, setPageAlert } = useContext(AlertContext);

  useEffect(() => {
    console.log("Nav user", user);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Left Section (Logo + Name) */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img className="logo me-2" src="logo.png" alt="logo" />
            <h3 className="mb-0">Niner Network</h3>
          </a>

          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Center Section (Search bar) */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex justify-content-center flex-grow-1">
              <input
                id="search"
                className="form-control rounded-pill me-2"
                type="text"
                placeholder="Search"
              />
            </div>

            {/* Right Section (Links + Profile Icon) */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/posts">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/social">Social</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
              {user.id ? (
                <li className="nav-item">
                  <span className="nav-link" onClick={(event) => handleLogOut(event, navigate, setUser)}>Logout</span>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              )}
            </ul>

            {/* Chat Icon and Profile */}
            <a ref={ref} className="nav-link" onClick={openChat}>
              <img className="message me-3" src="messageIcon.png" alt="message icon" />
            </a>
            <img
              src={`../images/${user.image ? user.image : 'blank-profile-picture.png'}`}
              className="profile-icon"
              alt="profile"
              onClick={() => navigate('account')}
            />
          </div>
        </div>
        <ChatModal isOpen={isChatOpen} onClose={closeChat} triggerRef={ref} />
      </nav>
      {pageAlert.error && <div className="alert alert-danger">{pageAlert.error}</div>}
      {pageAlert.success && <div className="alert alert-success">{pageAlert.success}</div>}
    </>
  );
};

export default Navbar;
