import React, {
  useState,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
} from "react";

import "./ChatRoom.css";
import ChatPreview from "./ChatPreview";
import Message from "./ChatPreview";
import ChatDetail from "./ChatDetail";
import { fetchAll } from "../../utils/messageAPI";

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
  const [chatList, setChatList] = useState<any>([]);

  useLayoutEffect(() => {
    setState({
      left: (triggerRef?.current?.getBoundingClientRect().left || 0) - 436,
      top: (triggerRef?.current?.offsetTop || 0) + 48,
    });
  }, [triggerRef]);

  useEffect(() => {
    const getChats = async () => {
      setChatList(await fetchAll());
    };
    getChats();
  }, []);

  if (!isOpen) return null;
  else {
    console.log("chat opened");
    return (
      <div
        className="chatContainer"
        style={{ top: state.top, left: state.left }}
      >
        <div className="chatHeader">
          <h4 className="chatTitle">Messages</h4>
          <button className="closeChat" onClick={onClose}>
            <img src="close.png"></img>
          </button>
        </div>
        <ChatPreview messages={chatList} />
        <div className="chatFooter">
          <button className="newChat">New Chat</button>
        </div>
      </div>
    );
  }
};

export default ChatModal;

//original socket.io implementation - will remove
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

/* <ChatPreview messages={messages} />

        <div className="chatFooter" >
        <button className="newChat">New Chat</button>
        </div> */

/* <ChatDetail /> */
