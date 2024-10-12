import React, {
  useState,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { io } from "socket.io-client";
import "./ChatRoom.css";

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
      left: (triggerRef?.current?.getBoundingClientRect().left || 0) - 448,
      top: (triggerRef?.current?.offsetTop || 0) + 48,
    });
  }, [triggerRef]);

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
        <div className="chatMiddle">
          <div className="chatPreviewContainer">
            <div className="senderIcon">
              {/* Placeholder for Profile Icon */}
            </div>
            <div className="chatPreview">
              <h6 className="chatSender">User Name</h6>
              <p className="chatContent">
                This is some chat content for the preview
              </p>
            </div>
            <button className="openChatButton">
              <img src="forwardArrow.png"></img>
            </button>
          </div>
          <div className="chatPreviewContainer">
            <div className="senderIcon">
              {/* Placeholder for Profile Icon */}
            </div>
            <div className="chatPreview">
              <h6 className="chatSender">User Name</h6>
              <p className="chatContent">
                This is some chat content for the preview
              </p>
            </div>
            <button className="openChatButton">
              <img src="forwardArrow.png"></img>
            </button>
          </div>
          <div className="chatPreviewContainer">
            <div className="senderIcon">
              {/* Placeholder for Profile Icon */}
            </div>
            <div className="chatPreview">
              <h6 className="chatSender">User Name</h6>
              <p className="chatContent">
                This is some chat content for the preview
              </p>
            </div>
            <button className="openChatButton">
              <img src="forwardArrow.png"></img>
            </button>
          </div>
        </div>
        <div className="chatFooter">
          <button className="newChat">New Chat</button>
        </div>
      </div>
    );
  }
};

export default ChatModal;
