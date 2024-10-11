import React from 'react';
import { Routes, useNavigate } from 'react-router-dom';
//import './Home.css';
function Account(){
    const navigate = useNavigate();
    return(
        <Routes>
            <div>
                <h1>This is the Account page</h1>
                <div id='Back Button'>
                    <button onClick={()=>navigate('login')}>
                        <text>Go back</text>
                    </button>
                </div>
            </div>
        </Routes>
    );
};

export default Account;