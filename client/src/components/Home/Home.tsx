import React from 'react';
import './Home.css';

// Define the type for the props
interface HomeProps {
  setCurrentPage: (page: string) => void; // setCurrentPage accepts a string argument
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="home">
      <div className="content-container">
        <h1>Let's get started</h1>
        <p className="subtext">this text says something below the bigger text</p>
        <div className="boxes-container">
          <div className="box" onClick={() => setCurrentPage('signup')}>
            <p>Create an Account</p>
          </div>
          <div className="box" onClick={() => setCurrentPage('login')}>
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
