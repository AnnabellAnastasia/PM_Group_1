import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {  
	const navigate = useNavigate();
	return (
    <div className="home">
      <div className="content-container">
        <h1>Let's get started</h1>
        <p className="subtext">this text says something below the bigger text</p>
        <div className="boxes-container">
          <div className="box" onClick={() => navigate('signup')}>
            <p>Create an Account</p>
          </div>
          <div className="box" onClick={() => navigate('login')}>
            <p>Already have an account? <br /> Sign in!</p>
          </div>
          <div className="box">
            <p>Customize your Profile!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
