import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import MessagesList from "./ChatMessage";
import MessagesData from "./ChatMessage";
import mongoose from "mongoose";
import { io } from "socket.io-client";
import { fetchMessages, closeMessage } from "../../utils/messageAPI";

const socket = io("http://localhost:8080"); //set socket

interface chatDetailProps {
  otherUserId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatDetail: React.FC<chatDetailProps> = ({
  otherUserId,
  isOpen,
  onClose,
}) => {
  const [chatList, setChatList] = useState<any>([]);
  const [newChatList, setNewChatList] = useState<any>([]);
  const [newMessage, setNewmessage] = useState("");
  const { user } = useContext(UserContext);

  if (!isOpen) return null;

  const getAllMessages = async () => {
    fetchMessages(otherUserId)
      .then((response) => {
        setChatList(response);
      })
      .catch((error) => {
        console.log("error getting messages");
      });
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  async function handleMessageSubmit(event: any) {
    if (otherUserId && user.id) {
      socket.emit("message", [event, newMessage, user.id, otherUserId]);
    }
  }

  socket.on("message", (data) => {
    setChatList([...chatList, data]);
    setNewChatList([...newChatList, data]);
  });

  function handleBack(event: any) {
    if (newChatList) closeMessage(event, newChatList); //save messages b4 leaving
    onClose;
  }

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

// await submitMesssage(
//   event,
//   newMessage,
//   new mongoose.Types.ObjectId(user.id),
//   new mongoose.Types.ObjectId(otherUserId)
// );

// interface ChatDetailProps {
//   message: typeof Message;
//   onClose: boolean;
// }

// interface Message {
//   body: string;
//   creator: mongoose.Types.ObjectId;
//   recipient: mongoose.Types.ObjectId;
// }
