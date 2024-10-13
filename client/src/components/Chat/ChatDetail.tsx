import React from "react";
import Message from "./ChatPreview";

interface ChatDetailProps {
  message: typeof Message;
  onClose: boolean;
}
// const ChatDetail: React.FC<ChatDetailProps> = ({ message, onClose }) => {
const ChatDetail = () => {
  return (
    <div className="message-detail">
      <h6 className="detailSenderName">Sender Name</h6>
      <div className="messageAndEditTextContainer">
        <div className="chatDetailMessageContainer">
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxSender">
            <p className="content">This is some content for the message!This is some content for the message!This is some content for the message!This is some content for the message!</p>
          </div>
          <div className="messageBoxClient">
            <p className="content">messageBoxClient message</p>
          </div>


        </div>
        <div className="inputContainer" tabIndex={0}>
          <textarea
            className="messageInput"
            placeholder="Message"

          ></textarea>
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
