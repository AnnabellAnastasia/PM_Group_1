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
          <input type="submit" className="sendButton">
            send
          </input>
        </form>
      </div>
    </div>
  );
};
export default ChatDetail;
