import React, { useContext, useEffect, useState, useRef } from 'react';
import { Routes, useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextWrapper';
import { fetchAuth } from '../../utils/userAPI';
import './Account.css';
//import './Home.css';
function Account(){
    
    const { user, setUser } = useContext(UserContext);
    const{id,firstName,lastName,image} = user;
    const navigate = useNavigate();
    return(
        <div>
            <header >
                <img src={`../images/${user.image ? user.image : 'blank-profile-picture.png'}`} className='UPP'></img>
                <p className='userInfo'>User's Name</p>
                <p className='userInfo'>User's Affiliation</p>
            </header>
            <body></body>
            <footer></footer>
            <div id='Back Button'>
                <button onClick={()=>navigate('../login')}>
                    <text>Go back</text>
                </button>
            </div>
        </div>
    );
};

export default Account;