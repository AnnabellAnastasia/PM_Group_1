import React, {
  useState,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { io } from "socket.io-client";
import "./ChatRoom.css";
import ChatPreview from "./ChatPreview";
import Message from "./ChatPreview"

const socket = io("http://localhost:8080"); //set socket

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
}



const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const [state, setState] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    setState({
      left: (triggerRef?.current?.getBoundingClientRect().left || 0) - 436,
      top: (triggerRef?.current?.offsetTop || 0) + 48,
    });
  }, [triggerRef]);

  const messages = [
    { id: 1, sender: "Name 1", content: "This is the content of Message 1" },
    { id: 2, sender: "Name 2", content: "This is the content of Message 2" },
  ];

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

  if (!isOpen) return null;
  else {
    console.log("chat opened");
    return (
      <div
        className="chatContainer"
        style={{ top: state.top, left: state.left }}
      >
        <div className="chatHeader">
          <h4 className="chatTitle">Chat</h4>
          <button className="closeChat" onClick={onClose}>
            <img src="close.png"></img>
          </button>
        </div>       

        <ChatPreview messages={messages} />

        <div className="chatFooter" >
        <button className="newChat">New Chat</button>
        </div>
        
      </div>
    );
  }
};

export default ChatModal;
