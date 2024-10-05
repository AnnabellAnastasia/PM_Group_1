import React from 'react';
import './Navbar.css';

const Navbar = () => {
    
    return (
        
        <nav className="navbar">
            {/* <img src='logo.png' alt="logo"></img> */}
            <div className="nav-left">
                <img className="logo" src='logo.png' alt="logo"></img>
                <h3>Niner Network</h3>
            </div>
            <div className='nav-Center'>
                <input id="search" className='nav-search' type='text' value="search"></input>
            </div>
            <div className="nav-right">
                <ul className="nav-list">
                    <li>
                     <h6><a href="/" className="nav-link">Link</a></h6>
                    </li>
                    <li>
                     <h6><a href="/" className="nav-link">Link</a></h6>
                    </li>
                    <li>
                     <h6><a href="/" className="nav-link">Link</a></h6>
                    </li>
                </ul>
               		<img src="../images/blank-profile-picture.png" className="profile-icon" alt="username"></img>
						</div>
        </nav>
    );
}

export default Navbar; 

