import React from "react";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { io } from "socket.io-client";
import { closeMessage, fetchMessages } from "../../utils/messageAPI";
import MessagesList from "./ChatMessage";
const socket = io("http://localhost:8080"); //set socket

interface chatDetailProps {
  chatId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatDetail: React.FC<chatDetailProps> = ({ chatId, isOpen, onClose }) => {
  const [chatList, setChatList] = useState<any>([]);
  const [messageReceived, setMessageReceived] = useState("");
  const [newChatList, setNewChatList] = useState<any>([]);
  const [newMessage, setNewmessage] = useState("");
  const { user } = useContext(UserContext);
  const [newChatId, setChatId] = useState("");

  if (!isOpen) return null;

//   const getAllMessages = async () => {
//     fetchMessages(chatId)
//       .then((response) => {
//         if (Array.isArray(response)) {
//           setChatList(response);
//           setChatId(response[0]);
//         } else if(response.status)
//       })
//       .catch((error) => {
//         console.log("error getting messages");
//       });
//   };

  useEffect(() => {
    const getAllMessages = async () => {
        setChatList(await fetchMessages(chatId));
    }
    getAllMessages();
}, []);

  async function handleMessageSubmit(event: any) {
    if (chatId && user.id) {
      const m = [newMessage, user.id, chatId];
      socket.emit("message", m);
      setChatList((prevChatList: any) => [...prevChatList, m]);
      setNewChatList((prevNewChatList: any) => [...prevNewChatList, m]);
    }
  }

  const joinChat = () => {
    if (chatId !== "") {
      socket.emit("join", chatId);
    }
  };

  async function handleBack(event: any) {
    if (newChatList) await closeMessage(event, newChatList); //save messages b4 leaving
    onClose();
  }

  useEffect(() => {
    socket.on("receive message", (data) => {
      //show new message
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="message-detail">
      <button onClick={handleBack}>Back</button>
      <h6 className="detailSenderName">Sender Name</h6>

      <div className="messageAndEditTextContainer">
        <div className="chatDetailMessageContainer">
          {chatList &&
            chatList.map(function (message: any) {
              return <MessagesList key={message._id} messageObj={message} />;
            })}
        </div>
        <form
          className="inputContainer"
          onSubmit={(event) => handleMessageSubmit(event)}
        >
          <textarea
            name="messageEntry"
            value={newMessage}
            onChange={(event) => {
              setNewmessage(event.target.value);
            }}
            className="messageInput"
            placeholder="Message"
          ></textarea>
          <button type="submit" className="sendButton">
            send
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatDetail;