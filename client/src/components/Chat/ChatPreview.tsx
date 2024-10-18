import React from "react";
import { useState } from "react";
import ChatDetail from "./ChatDetail";

interface Message {
  body: string;
  creator: string;
  chatId: string //should be chat id
}
interface ChatMessagePreviewProps {
  messages: Message[];
}

const ChatPreview: React.FC<ChatMessagePreviewProps> = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  //for opening chat detail
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);

  const handleOpenChatDetail = (event:any) => {
    // setSelectedMessage(message);
    let id = event.target.getAttribute('data-key');
    return(
      <ChatDetail chatId={id} isOpen={isDetailOpen} onClose={closeDetail}></ChatDetail>
    )
  };

  const closeChatDetail = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="chatMiddle">
      {messages.map((message: Message) => (
        <div
          key={message.chatId}
          className="chatPreviewContainer"
          data-key={message.chatId}
          onClick={handleOpenChatDetail}
        >
          <div className="senderIcon">{/* Placeholder for Profile Icon */}</div>
          <div className="chatPreview">
            <h6 className="chatSender">{message.creator}</h6>
            <p className="chatContent">{message.body}</p>
          </div>
          <button className="openChatButton">
            <img src="forwardArrow.png" alt="Open Chat" />
          </button>
        </div>
      ))}

      {/* <ChatDetail messageId={message.id} isOpen={isDetailOpen} onClose={closeDetail}></ChatDetail> */}
    </div>
  );
};

export default ChatPreview;

// {selectedMessage && (
//   <div className="message-details">
//     <h4>Message Details</h4>
//     <h5>From: {selectedMessage.sender}</h5>
//     <p>{selectedMessage.content}</p>
//     <button onClick={closeChatDetail}>Close</button>
//   </div>
// )}
