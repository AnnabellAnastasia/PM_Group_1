import React from "react";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { io } from "socket.io-client";
import { closeMessage, fetchMessages, newChat } from "../../utils/messageAPI";
import MessagesList from "./ChatMessage";
import { JsxElement } from "typescript";
const socket = io("http://localhost:8080"); //set socket

interface CommonChatDetailProps {
  isOpen: boolean;
  onClose: () => void;
  chatId?: string;
  otherUserId?: string;
  isNew: boolean;
}

const ChatDetail: React.FC<CommonChatDetailProps> = ({
  isOpen,
  onClose,
  chatId,
  otherUserId,
  isNew,
}) => {
  const [chatList, setChatList] = useState<any>([]);
  const [messageReceived, setMessageReceived] = useState("");
  const { user } = useContext(UserContext);
  const [newChatId, setChatId] = useState("");
  const [newChatList, setNewChatList] = useState<any>([]);
  const [newMessage, setNewmessage] = useState("");

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

  //if if is a new chat
  // do not fetch messages.
  //call api for create new chat
  //if it is not a new chat
  //call api to get messages and populate
  //etc

  //if is not a new chat fetch all messages
  if (!isNew && chatId) {
    useEffect(() => {
      const getAllMessages = async () => {
        setChatList(await fetchMessages(chatId));
      };
      getAllMessages();
    }, []);
  } else if (isNew && otherUserId) {
    //if is a new chat call api to start a new conversation and get the chat id.
    useEffect(() => {
      const startNewChat = async () => {
        setChatList(await newChat(user.id, otherUserId));
      };
      startNewChat();
    }, []);
  }

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

  if (!isOpen) return null;

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
