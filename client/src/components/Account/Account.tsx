import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextWrapper';
import './Account.css';

function Account() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="container text-center py-5">
      <header className="mb-4">
        <img 
          src={`../images/${user.image ? user.image : 'blank-profile-picture.png'}`} 
          className="UPP img-thumbnail rounded-circle" 
          alt="User Profile"
        />
        <h1 className="mt-3">{`${user.firstName} ${user.lastName}`}</h1>
      </header>

      <div>
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => navigate('../login')}
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default Account;
