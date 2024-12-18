import React, { useRef } from "react";
import Message from "./ChatRoom";
import "./ChatDetail.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { io, Socket } from "socket.io-client";
import { closeMessage, fetchMessages, newChat } from "../../utils/messageAPI";
import { SocketContext } from "../SocketContext";
import { MessageContext } from "./messageContext";

interface CommonChatDetailProps {
  isOpen: boolean;
  onClose: () => void;
  chatId?: string;
  otherUserId?: string;
  isNew: boolean;
  chatUser?: any;
}
//make it justuse the convo object and nothing else to save memory
//update the convo document so you dont have to have a separate new messages array.
//mama lets research
const ChatDetail: React.FC<CommonChatDetailProps> = ({
  isOpen,
  onClose,
  chatId,
  otherUserId,
  isNew,
  chatUser,
}) => {
  const socket = useContext(SocketContext);
  // const [chatList, setChatList] = useState<any>([]);
  const [newChatList, setNewChatList] = useState<any>([]);
  const [thisChatId, setChatId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(UserContext);
  // const [hayMessages, setHayMessages] = useState<boolean>();
  const [isErr, setErr] = useState<boolean>();
  const [saved, setSaved] = useState<boolean>(false);
  const { chatList, setChatList } = useContext(MessageContext);
  const [thisChatList, setThisChatList] = useState<any[]>([]);
  const [convo, setConvo] = useState<any>();
  const [ userNames, setUserNames] = useState<String>("");

  useEffect(() => {
    if (!isNew && chatList && chatId) {
      const getAllMessages = async () => {
        console.log("chat id sent to message detail", chatId);
        console.log("chatList from context", chatList);
        const temp = chatList.find((convo) => convo._id == chatId);
        if (temp) {
          setConvo(temp);
          console.log("convo found in first useEffect", temp);
          setThisChatList(temp.messages);
          setChatId(temp._id);
          if(temp.user1.firstName == user.firstName) {
            setUserNames(temp.user2.firstName + " " + temp.user2.lastName);
          } else {
            setUserNames(temp.user1.firstName + " " + temp.user1.lastName);
          }
        }
      };
      getAllMessages();
    } else if (isNew && otherUserId) {
      //if is a new chat call api to start a new conversation and get the chat id.
      const startNewChat = async () => {
        newChat(user.id, otherUserId).then((parsed) => {
          // console.log(response);
          // JSON.parse(response).then((parsed:any) => {
          console.log("new chat returned this", parsed);
          if (Array.isArray(parsed)) {
            console.log("there are messages");
            console.log(parsed);
            const temp = chatList.find(
              (convo) => convo._id == parsed[parsed.length -1].chatId
            );
            // setChatList((list:any) => [...list, parsed || []]);
            if (temp) {
              console.log("convo found", temp);
              setThisChatList(temp.messages);
              setChatId(temp._id);

              socket.emit("join", temp._id, (response: any) => {
                console.log(response.status);
                if (response.status == "400") {
                  setErr(true);
                  console.error("unable to join room");
                }
              });
            }
          } else {
            console.log("there are no messages");
            setChatId(parsed);
            const convoData = {
              _id: parsed,
              messages: [],
              user1: user.id,
              user2: otherUserId,
            };
            setChatList((list: any) => [...list, convoData]);
            console.log("created new chat");
            socket.emit("join", parsed, (response: any) => {
              console.log(response.status);
              if (response.status == "400") {
                setErr(true);
                console.error("unable to join room");
              }
            });
          }
          // })
        });
      };
      startNewChat();
    }
  }, [chatId, isOpen, socket]);


  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatList, thisChatList, convo, isOpen, newChatList]);

  useEffect(() => {
    if (chatList && thisChatId) {
      if (convo) {
        console.log("convo on re-fetch", convo.messages);
        setThisChatList(convo.messages);
      } else {
        const temp = chatList.find((convo) => convo.id == thisChatId);
        if (temp) {
          setConvo(temp);
          setThisChatList(temp.messages);
        }
      }
    }
  }, [chatList]);

  useEffect(() => {
    if (!socket) return;
    const handleUsrExited = () => {
      setSaved(true);
      setNewChatList(null);
    };
    const handleError = (data: any) => {
      console.error("connection error ", data);
    };
    socket.on("usrExited", handleUsrExited);
    socket.on("connect_error", handleError);
  }, [socket]);

  const sendMessage = async (event: any) => {
    event?.preventDefault();
    if (newMessage !== "") {
      const messageData = {
        body: newMessage,
        creator: user.id,
        chatId: thisChatId,
      };
      if (convo) {
        const newMessages = convo.messages;
        newMessages.push(messageData);
        convo.messages = newMessages;
      } else {
        const temp = chatList.find((convo) => convo.id == thisChatId);
        if (temp) {
          setConvo(temp);
          temp.messages.push(messageData);
          setThisChatList(temp.messages);
        }
      }
      socket.emit("message", messageData);
      setNewChatList((list: any) => [...list, messageData]);
      setChatList((list: any) => [...list, messageData]);
      setThisChatList((list: any) => [...list, messageData]);
      setNewMessage("");
      setSaved(false);
    }
  };

  async function handleBack(event: any) {
    if (!chatId) onClose();
    if (newChatList && newChatList.length && !saved) {
      const saveStatus = await closeMessage(newChatList); //save messages b4 leaving
      console.log("save status", saveStatus);
      setSaved(true);
    }
    socket.emit("leave", thisChatId);
    setChatId("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="message-detail">
      <div className="detail-header">
      <button onClick={handleBack}>Back</button>
      <h6 className="detailSenderName">{chatUser ? chatUser : userNames}</h6>
      </div>
      <div className="messageAndEditTextContainer">
        <div className="chatDetailMessageContainer" ref={containerRef}>
          {isErr && <h6>There was an error connecting to the chat !</h6>}
          {Array.isArray(thisChatList) &&
            thisChatList.length > 0 &&
            thisChatList.map(function (message: any) {
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
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

function MessagesList({ messageObj }: any) {
  const { user } = useContext(UserContext);
  console.log("rendering messages");
  return (
    <div
      className="messageBoxSender"
      key={messageObj._id}
      id={messageObj.creator == user.id ? "you" : "other"}
    >
      <p className="content">{messageObj.body}</p>
    </div>
  );
}

export default ChatDetail;
