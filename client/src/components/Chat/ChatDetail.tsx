import React from "react";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { io } from "socket.io-client";
import { closeMessage, fetchMessages, newChat } from "../../utils/messageAPI";
import MessagesList from "./ChatMessage";
import { JsxElement } from "typescript";
//set socket

interface CommonChatDetailProps {
  isOpen: boolean;
  onClose: () => void;
  chatId?: string;
  otherUserId?: string;
  isNew: boolean;
}
const socket = io("http://localhost:8080");
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
  const [hayMessages, setHayMessages] = useState<boolean>();
  const [thisChatId, setChatId] = useState("");
  const [newChatList, setNewChatList] = useState<any>([]);
  const [newMessage, setNewmessage] = useState("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  //if if is a new chat
  // do not fetch messages.
  //call api for create new chat
  //if it is not a new chat
  //call api to get messages and populate
  //etc

  //if is not a new chat fetch all messages
  useEffect(() => {
    if (!isNew && chatId) {
      const getAllMessages = async () => {
        setChatList(await fetchMessages(chatId));
      };
      setChatId(chatId);
      getAllMessages();
      setHayMessages(true);
    } else if (isNew && otherUserId) {
      //if is a new chat call api to start a new conversation and get the chat id.
      const startNewChat = async () => {
        const parsed = await newChat(user.id, otherUserId);
        // const rsponse = await JSON.parse(response);
        if (parsed[0].creator) {
          console.log("there are messages");
          console.log(parsed[0].body);
          setHayMessages(true);
          setChatId(parsed[0].chatId);
          setChatList(parsed);
        } else {
          console.log("there are no messages");
          setChatId(parsed);
        }
      };
      startNewChat();
    }
  }, []);
  // thisChatId, otherUserId, user.id
  // useEffect(() => {
  //   socket.on("receive message", (data) => {
  //     //show new message
  //     setMessageReceived(data.message);
  //   });
  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }
  //   function onConnect() {
  //     setIsConnected(true);
  //   }
  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("receive message", setMessageReceived);
  //   };
  // }, []);
  useEffect(() => {
    const joinChat = () => {
      if (thisChatId !== "") {
        socket.emit("join", thisChatId);
      }
    };
    joinChat();
  }, []);
  // const joinChat = () => {
  //   if (thisChatId !== "") {
  //     socket.emit("join", chatId);
  //   }
  // };
  useEffect(() => {
    socket.on("receive message", (data) => {
      //show new message
      setMessageReceived(data.message);
    });
  }, []);


  async function handleMessageSubmit(event: any) {
    event.preventDefault();
    console.log("message sent!", event);
    console.log(
      "ids required for actually sending the message",
      thisChatId,
      user.id
    );
    if (thisChatId && user.id) {
      const m = [newMessage, user.id, thisChatId];
      socket.emit("message", m);
      setChatList((prevChatList: any) => [...prevChatList, m]);
      setNewChatList((prevNewChatList: any) => [...prevNewChatList, m]);
      console.log("new chats", newChatList);
      setHayMessages(true);
    }
  }

  async function handleBack(event: any) {
    if (newChatList && newChatList.length)
      await closeMessage(event, newChatList); //save messages b4 leaving
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="message-detail">
      <button onClick={handleBack}>Back</button>
      <h6 className="detailSenderName">Sender Name</h6>

      <div className="messageAndEditTextContainer">
        <div className="chatDetailMessageContainer">
          {hayMessages &&
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
