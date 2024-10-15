import React from "react";
import Message from "./ChatPreview";
import "./ChatDetail.css";
import MessagesList from "./ChatMessage";
import MessagesData from "./ChatMessage";

interface ChatDetailProps {
  message: typeof Message;
  onClose: boolean;
}
// const ChatDetail: React.FC<ChatDetailProps> = ({ message, onClose }) => {
const ChatDetail = () => {
  const chatMessages: MessagesData = {
    messages: [
      {
        id: 1,
        sender: "Alice",
        content: "Hello, how are you?",
      },
      {
        id: 2,
        sender: "Bob",
        content: "I'm good, thanks! How about you?",
      },
      {
        id: 3,
        sender: "Alice",
        content: "I'm great! Thanks for asking.",
      },
    ],
  };
  return (
    // <div className="message-detail">
    //   <MessagesList {...messages}/>
    // </div>

    <div className="message-detail">
      <h6 className="detailSenderName">Sender Name</h6>
      <div className="messageAndEditTextContainer">
        <div className="chatDetailMessageContainer">
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxSender">
            <p className="content">
              This is some content for the message!This is some content for the
              message!This is some content for the message!This is some content
              for the message!
            </p>
          </div>
          <div className="messageBoxClient">
            <p className="content">messageBoxClient message</p>
          </div>
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
