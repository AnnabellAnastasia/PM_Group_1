import React from "react";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { io, Socket } from "socket.io-client";
import { closeMessage, fetchMessages, newChat } from "../../utils/messageAPI";
import MessagesList from "./ChatMessage";

//set socket
// const socket = io("http://localhost:8080");

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
  const [socket, setSocket] = useState<Socket|undefined>();
  const [chatList, setChatList] = useState<any>([]);
  const [newChatList, setNewChatList] = useState<any>([]);
  const [thisChatId, setChatId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(UserContext);
  const [hayMessages, setHayMessages] = useState<boolean>();
  
  // const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if(!socket) {
      const newSocket = io("http://localhost:8080");
      setSocket(newSocket);
      console.log("new socket connected:", newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
    
  }, [user, socket]);

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

  useEffect(() => {
    if(thisChatId && socket) {
      socket.emit("join", thisChatId);
    }
  }, [socket, thisChatId])

  useEffect(() => {
    if(!socket) return;

    const handleMessageReceive = (data: any) => {
      setChatList((list: any) => [...list, data]);
      setNewChatList((list: any) => [...list, data]);
    }

    socket.on("receive_message", handleMessageReceive);
    return () => socket.off("receive_message", handleMessageReceive);
  }, [socket]);

  const sendMessage = async (event: any) => {
    event?.preventDefault();
    if (newMessage !== "") {
      const messageData = {
        body: newMessage,
        creator: user.id,
        chatId: thisChatId
        // time: new Date(Date.now()), //add time to messages
      };
      await socket?.emit("message", messageData);
      setNewChatList((list: any) => [...list, messageData]);
      setChatList((list: any) => [...list, messageData]);
      setNewMessage("");
      setHayMessages(true);
    }
  };


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
          onSubmit={(event) => sendMessage(event)}
        >
          <textarea
            name="messageEntry"
            value={newMessage}
            onChange={(event) => {
              setNewMessage(event.target.value);
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

// const handleMessageSubmit = (event:any) => {
//   event.preventDefault();
//   console.log("message sent!", event);
//     console.log(
//       "ids required for actually sending the message",
//       thisChatId,
//       user.id
//     );
//     if (thisChatId && user.id) {
//       const m = [newMessage, user.id, thisChatId];
//       socket.emit("message", m);
//       setChatList((prevChatList: any) => [...prevChatList, m]);
//       setNewChatList((prevNewChatList: any) => [...prevNewChatList, m]);
//       console.log("new chats", newChatList);
//       setHayMessages(true);
//     }
// }
