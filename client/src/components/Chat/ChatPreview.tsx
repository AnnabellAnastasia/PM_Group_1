import React from "react";
import { useState } from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
}
interface ChatMessagePreviewProps {
  messages: Message[];
}

const ChatPreview: React.FC<ChatMessagePreviewProps> = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleOpenChatDetail = (message: Message) => {
    setSelectedMessage(message);
  };

  const closeChatDetail = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="chatMiddle">
      {messages.map((message: Message) => (
        <div
          key={message.id}
          className="chatPreviewContainer"
          onClick={() => handleOpenChatDetail(message)}
        >
          <div className="senderIcon">{/* Placeholder for Profile Icon */}</div>
          <div className="chatPreview">
            <h6 className="chatSender">{message.sender}</h6>
            <p className="chatContent">{message.content}</p>
          </div>
          <button className="openChatButton">
            <img src="forwardArrow.png" alt="Open Chat" />
          </button>
        </div>
      ))}

      {selectedMessage && (
        <div className="message-details">
          <h4>Message Details</h4>
          <h5>From: {selectedMessage.sender}</h5>
          <p>{selectedMessage.content}</p>
          <button onClick={closeChatDetail}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ChatPreview;
