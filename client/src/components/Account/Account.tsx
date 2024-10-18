import React, { useContext, useEffect, useState, useRef } from 'react';
import { Routes, useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextWrapper';
import './Account.css';
//import './Home.css';
function Account(){
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    return(
        <div>
            <header>
            <img src={`../images/${user.image ? user.image : 'blank-profile-picture.png'}`} className='UPP'></img>
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