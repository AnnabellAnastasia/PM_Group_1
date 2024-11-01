import React from "react";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { io } from "socket.io-client";
import { closeMessage, fetchMessages } from "../../utils/messageAPI";
import MessagesList from "./ChatMessage";
import { JsxElement } from "typescript";
const socket = io("http://localhost:8080"); //set socket

type CommonChatDetailProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ChatDetailProps = {
  chatId: string;
};

//just make it a state variable

type NewChatDetailProps = {
    otherUserId: any;
}

function ChatDetail(props: CommonChatDetailProps & ChatDetailProps) : JSX.Element;
function ChatDetail(props: CommonChatDetailProps & NewChatDetailProps) : JSX.Element; 

export function ChatDetail(props: CommonChatDetailProps & ChatDetailProps) {
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

  //change the way you get all the messages
  useEffect(() => {
    const getAllMessages = async () => {
      setChatList(await fetchMessages(props.chatId));
    };
    getAllMessages();
  }, []);

  async function handleMessageSubmit(event: any) {
    if (props.chatId && user.id) {
      const m = [newMessage, user.id, props.chatId];
      socket.emit("message", m);
      setChatList((prevChatList: any) => [...prevChatList, m]);
      setNewChatList((prevNewChatList: any) => [...prevNewChatList, m]);
    }
  }

  const joinChat = () => {
    if (props.chatId !== "") {
      socket.emit("join", props.chatId);
    }
  };

  async function handleBack(event: any) {
    if (newChatList) await closeMessage(event, newChatList); //save messages b4 leaving
    props.onClose();
  }

  useEffect(() => {
    socket.on("receive message", (data) => {
      //show new message
      setMessageReceived(data.message);
    });
  }, [socket]);

  if (!props.isOpen) return null;

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
}

export function ChatDetail(props: CommonChatDetailProps & NewChatDetailProps) {

}
