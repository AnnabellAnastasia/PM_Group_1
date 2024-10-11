import React, {useState, useEffect} from "react";
import {io} from 'socket.io-client';

const socket = io('http://localhost:8080'); //set socket

const [messages, setMessages] = useState([]); //declare setMessages with use state that takes an array
const [messageText, setMessageText] = useState(''); //declare setMessageText with usestate that takes a string

//send message
const sendMessage = () => {
    socket.emit('message', messageText);
    setMessageText('');
}

//recieve message 
useEffect(() => {
    socket.on('message', (message) => {
        setMessages(messages => [messageText]);   
     });
}, []);

function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([])



    return (

        <div className="chatContainer">



        </div>
    )
}

export default ChatRoom;