import React, { useContext, useEffect, useState, useRef } from 'react';
import { fetchProfile, handleLogOut } from '../../utils/userAPI';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextWrapper';
import ChatModal from "../Chat/ChatRoom";
import './Navbar.css';


const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const ref = useRef(null);
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

  useEffect(() => {
			console.log("Nav user", user);
  }, []);

  return (
    <nav className="navbar">
      {/* Left Section (Logo + Name) */}
      <div className="nav-left">
        <img className="logo" src="logo.png" alt="logo" />
        <h3>Niner Network</h3>
      </div>

      <div className="nav-Center">
        <input
          id="search"
          className="nav-search"
          type="text"
          placeholder="Search"
        ></input>
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
<<<<<<< HEAD

=======
        {/* <div className='message-icon'> */}
        <a ref={ref} className="openChatButton" onClick={openChat}>
          <img className="message" src="messageIcon.png" alt="message icon" />
        </a>
        {/* </div> */}
>>>>>>> main
				<img src={`../images/${user.image ? user.image : 'blank-profile-picture.png'}`} className="profile-icon" alt=""></img>
      </div>
      <ChatModal isOpen={isChatOpen} onClose={closeChat} triggerRef={ref}></ChatModal>
    </nav>
  );
};

export default Navbar;
