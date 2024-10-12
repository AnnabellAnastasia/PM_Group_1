import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); //set socket

function ChatRoom() {
//   const [messages, setMessages] = useState(
//     JSON.parse(localStorage.getItem("messages")) || []
//   ); //declare setMessages with use state that takes an array
//   const [messageText, setMessageText] = useState(""); //declare setMessageText with usestate that takes a string
//   const [userEvent, setUser] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("messages", JSON.stringify(messages));
//   }, [messages]);

//   const joinChat = (userDetails) => {
//     setUser(userDetails);
//     socket.emit("join", userDetails);
//   };

//   const leaveChat = () => {
//     socket.emit("leave", user);
//     setUser(null);
//   };

//   //send message
//   const sendMessage = () => {
//     socket.emit("message", messageText);
//     setMessageText("");
//   };

//  // receive message
//  useEffect(() => {
//     const handleMessage = (message) => {
//       setMessages((messages) => [... messages, message]);
//     };

//     socket.on("message", handleMessage);

//     // Cleanup function to avoid memory leaks
//     return () => {
//       socket.off("message", handleMessage);
//     };
//   }, []);


  return <div className="chatContainer"></div>;
}

export default ChatRoom;
