import React from "react";
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
  passChatList?: any;
  onChange?: any; //recent change
}

const ChatDetail: React.FC<CommonChatDetailProps> = ({
  isOpen,
  onClose,
  chatId,
  otherUserId,
  isNew,
  chatUser,
  passChatList,
  onChange, //recent change
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

  useEffect(() => {
    if (!isNew && chatList && chatId) {
      const getAllMessages = async () => {
        console.log("chat id sent to message detail", chatId);
        console.log("chatList from context", chatList);

        const temp = chatList.find((convo) => convo._id == chatId);
        setConvo(temp);
        if (temp) {
          console.log("convo found", temp);
          setThisChatList(temp.messages);
          setChatId(temp._id);
        }
      };
      getAllMessages();

      // if (!isNew && passChatList) {
      //   const getAllMessages = async () => {
      //     console.log("passchatlist", passChatList);
      //     setThisChatList(passChatList.messages);
      //     setChatId(passChatList._id);
      //   };
      //   setHayMessages(true);
      //   getAllMessages();
      // socket.emit("join", passChatList.mesages[0].chatId, (response: any) => {
      //   console.log(response.status);
      //   if(response.status == "400") {
      //     setErr(true);
      //     console.log("Unable to join room");
      //   }
      // });
    } else if (isNew && otherUserId) {
      //if is a new chat call api to start a new conversation and get the chat id.
      const startNewChat = async () => {
        const parsed = await newChat(user.id, otherUserId);
        // const rsponse = await JSON.parse(response);
        if (parsed[0].creator) {
          console.log("there are messages");
          console.log(parsed);
          // setHayMessages(true);
          setChatId(parsed[0].chatId);
          setChatList(parsed || []);
        } else {
          console.log("there are no messages");
          setChatId(parsed);
        }
        if (thisChatId) {
          socket.emit("join", thisChatId, (response: any) => {
            console.log(response.status);
            if (response.status == "400") {
              setErr(true);
              console.log("Unable to join room");
            }
          });
        }
      };
      startNewChat();
    }

    // return () => {
    //   socket.emit("leave", thisChatId);
    // };
  }, [chatId, isOpen, socket]);

  useEffect(() => {
    if(chatList && chatId) {
      // const convo = chatList.find((convo) => convo._id == chatId);
      if (convo) {
        console.log("convo found", convo);
        setThisChatList(convo.messages);
        setChatId(convo._id);
      }
    }
  }, [chatList]);

  useEffect(() => {
    if (!socket) return;

    const handleUsrExited = () => {
      setSaved(true);
      setNewChatList(null);
    };

    // const handleReceiveMessage = (data: any) => {
    //   if(data.chatId == chatId) {
    //     setChatList((list: any) => [...list, data]);
    //     setNewChatList((list: any) => [...list, data]);
    //   }
    // };

    const handleError = (data: any) => {
      console.error("connection error ", data);
    };

    socket.on("usrExited", handleUsrExited);

    // socket.on("receive_message", handleReceiveMessage);

    socket.on("connect_error", handleError);

    // return () => {
    //   socket.off("receive_message", handleReceiveMessage);
    // };
  }, [socket]);

  const sendMessage = async (event: any) => {
    event?.preventDefault();
    if (newMessage !== "") {
      const messageData = {
        body: newMessage,
        creator: user.id,
        chatId: thisChatId,
      };
      // const convo = chatList.find((convo) => convo._id == chatId);
      if (convo) {
        console.log("convo found", convo);
        const newMessages = convo.messages;
        newMessages.push(messageData);
        convo.messages = newMessages;
      }
      socket.emit("message", messageData);
      setNewChatList((list: any) => [...list, messageData]);
      setChatList((list: any) => [...list, messageData]);
      setThisChatList((list:any) => [...list, messageData]);
      setNewMessage("");
      // setHayMessages(true);
      setSaved(false);
    }
  };

  async function handleBack(event: any) {
    if (newChatList && newChatList.length && !saved) {
      await closeMessage(event, newChatList); //save messages b4 leaving
      setSaved(true);
    }
    // console.log("on change sent back");
    // const msg = chatList.find((msg) => msg._id == thisChatId);
    // if(msg) {
      
    // }
    // onChange(msg);
    // //end of changes
    socket.emit("leave", thisChatId);
    setChatId("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="message-detail">
      <button onClick={handleBack}>Back</button>
      <h6 className="detailSenderName">{chatUser && chatUser}</h6>

      <div className="messageAndEditTextContainer">
        <div className="chatDetailMessageContainer">
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
            send
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
