import React, { useEffect } from "react";
import { useState } from "react";
import ChatDetail from "./ChatDetail";
import { fetchAll } from "../../utils/messageAPI";

interface Message {
  body: string;
  creator: string;
  chatId: string; //should be chat id
}
interface ChatMessagePreviewProps {
  messages: Message[];
}

const ChatPreview: React.FC<ChatMessagePreviewProps> = ({ messages }) => {
  const [selectedChatId, setSelectedChatId] = useState<any>();
  //for opening chat detail
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);
  const [otherUserId, setOtherUserId] = useState<any>();

  const handleOpenChatDetail = (event: any) => {
    // setSelectedMessage(message);
    let id = event.target.getAttribute("data-key");
    setSelectedChatId(id);
    setIsDetailOpen(true);
  
  };


  const closeChatDetail = () => {
    setSelectedChatId(null);
  };


  return (
    <div className="chatMiddle">
      {messages && messages.length ? (messages.map((message: Message) => (
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
      ))) : <h6>No Messages</h6>}
      <ChatDetail
        chatId={selectedChatId}
        isOpen={isDetailOpen}
        onClose={closeDetail}
        isNew={false}
      ></ChatDetail>
    

      {/* <ChatDetail messageId={message.id} isOpen={isDetailOpen} onClose={closeDetail}></ChatDetail> */}
    </div>
  );
};

export default ChatPreview;
