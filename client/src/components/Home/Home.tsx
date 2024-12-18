import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../ContextWrapper";
import './Home.css';
import SignUp from '../SignUp/SignUp';

function Home() {  
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="container">
      <div className="text-center my-5">
        <h1>Let's get started</h1>
        <p className="subtext">This text says something below the bigger text</p>
      </div>

      <div className="row d-flex align-items-stretch"> 
        <div className="col-md-4 mb-4">
          <div className="box p-3 bg-light text-center h-100" onClick={() => navigate('signup')}> {/* Full height box */}
            <p>Create an Account</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="box p-3 bg-light text-center h-100" onClick={() => navigate('login')}>
            <p>Already have an account? <br /> Sign in!</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="box p-3 bg-light text-center h-100" onClick={() => navigate(`${user.id ? `/account/${user.id}` : 'login'}`)}>
            <p>Customize your Profile!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
