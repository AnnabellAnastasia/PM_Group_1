import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import MessagesList from "./ChatMessage";
import MessagesData from "./ChatMessage";
import mongoose from "mongoose";
import { fetchMessages, submitMesssage } from "../../utils/messageAPI";

interface ChatDetailProps {
  message: typeof Message;
  onClose: boolean;
}

interface Message {
  body: string;
  creator: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
}

// const ChatDetail: React.FC<ChatDetailProps> = ({ message, onClose }) => {
const ChatDetail = () => {
  const [chatList, setChatList] = useState<any>([]);
  const [newMessage, setNewmessage] = useState("");
  const [otherUserId, setOtherUserId] = useState<mongoose.Types.ObjectId>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getAllMessages = async () => {
      setChatList(await fetchMessages(otherUserId));
    };
    getAllMessages();
  }, []);

  async function handleMessageSubmit(event: any) {
    if (otherUserId && user.id) {
      await submitMesssage(
        event,
        newMessage,
        new mongoose.Types.ObjectId(user.id),
        new mongoose.Types.ObjectId(otherUserId)
      ); 
    }
  }

  return (
    <div className="message-detail">
      <h6 className="detailSenderName">Sender Name</h6>
      <div className="messageAndEditTextContainer">
        <div className="chatDetailMessageContainer">
          {chatList &&
            chatList.map(function (message: any) {
              return <MessagesList key={message._id} messageObj={message} />;
            })}

          {/* <div className="messageBoxClient">
            <p className="content">messageBoxClient message</p>
          </div> */}
        </div>
        <div className="inputContainer" tabIndex={0}>
          <textarea className="messageInput" placeholder="Message"></textarea>
          {/* <div className="sendButton"><h6>send</h6></div> */}
          <button className="sendButton">send</button>
          {/* <img src="send.png"></img> */}
        </div>
      </div>

      {/* <h3>{message.sender}</h3>
    <p>{message.content}</p>
    <button onClick={onClose}>Close</button> */}
    </div>
  );
};
export default ChatDetail;
