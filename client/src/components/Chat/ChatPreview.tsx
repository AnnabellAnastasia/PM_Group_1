import React from "react";

interface Message {
    id: number;
    sender: string;
    content: string;
  }
interface ChatMessagePreviewProps {
  messages: Message[];
}

const ChatPreview: React.FC<ChatMessagePreviewProps> = ({messages}) => {
  return (
    <div className="chatMiddle">
      {messages.map((message:Message) => (
          <div key={message.id} className="chatPreviewContainer">
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
    </div>
  );
}

export default ChatPreview ;
