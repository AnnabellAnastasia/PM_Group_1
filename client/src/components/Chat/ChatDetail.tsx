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
  chatId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatDetail: React.FC<chatDetailProps> = ({
  chatId,
  isOpen,
  onClose,
}) => {
  const [chatList, setChatList] = useState<any>([]);
  const [messageReceived, setMessageReceived] = useState("");
  const [newChatList, setNewChatList] = useState<any>([]);
  const [newMessage, setNewmessage] = useState("");
  const { user } = useContext(UserContext);
  const [newChatId, setChatId] = useState("");

  if (!isOpen) return null;

  const getAllMessages = async () => {
    fetchMessages(chatId)
      .then((response) => {
        if (Array.isArray(response)) {
          setChatList(response);
          setChatId(response[0]);
        }
      })
      .catch((error) => {
        console.log("error getting messages");
      });
  };

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
    onClose;
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

// useEffect(() => {
//   const getChats = async () => {
//     setChatList(await getAllMessages());
//     setChatId(chatList[0].chatId);
//   };
//   getChats();
// }, []);

// useEffect(() => {
//   const setMessage = (data:any) => {
//     setChatList((prevChatList:any) => [...prevChatList, data]);
//     setNewChatList((prevNewChatList:any) => [...prevNewChatList, data]);
//   };
//   socket.on("message", setMessage);

//   return () => {
//     socket.off("message", setMessage);
//   };
// }, []);
