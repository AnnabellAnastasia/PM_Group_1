import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ChatDetail from "./ChatDetail";
import { fetchAll } from "../../utils/messageAPI";
import { SocketContext } from "../SocketContext";
import NewChat from "./NewChat";

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
  //for opening new chat
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
  const openNew = () => setIsNewOpen(true);
  const closeNew = () => setIsNewOpen(false);
  const [otherUserId, setOtherUserId] = useState<any>();
  const socket = useContext(SocketContext);
  const [friendName, setFriendName] = useState<string>("");

  const handleOpenChatDetail = (event: any) => {
    // setSelectedMessage(message);
    let id = event.target.getAttribute("data-key");
    setSelectedChatId(id);
    setIsDetailOpen(true);
    // if(id && socket) {
    //   socket.emit("join", id);
    // }
  };

  const closeChatDetail = () => {
    setSelectedChatId(null);
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      {isNewOpen ? (
        <NewChat isOpen={isNewOpen} onClose={closeNew} />
      ) : (
        <>
          {isDetailOpen ? (
            <ChatDetail
              chatId={selectedChatId}
              isOpen={isDetailOpen}
              onClose={closeDetail}
              isNew={false}
            ></ChatDetail>
          ) : (
            <>
              <div className="chatMiddle">
                {messages.map((message: Message) => (
                  <div
                    key={message.chatId}
                    className="chatPreviewContainer"
                    data-key={message.chatId}
                    onClick={handleOpenChatDetail}
                  >
                    <div className="senderIcon">
                      {/* Placeholder for Profile Icon */}
                    </div>
                    <div className="chatPreview">
                      <h6 className="chatSender">{message.creator}</h6>
                      <p className="chatContent">{message.body}</p>
                    </div>
                    <button className="openChatButton">
                      <img src="forwardArrow.png" alt="Open Chat" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="chatFooter">
                <button className="newChat" onClick={openNew}>
                  New Chat
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ChatPreview;

// {messages && messages.length ? (
// messages.map((message: Message) => (
//   <div
//     key={message.chatId}
//     className="chatPreviewContainer"
//     data-key={message.chatId}
//     onClick={handleOpenChatDetail}
//   >
//     <div className="senderIcon">
//       {/* Placeholder for Profile Icon */}
//     </div>
//     <div className="chatPreview">
//       <h6 className="chatSender">{message.creator}</h6>
//       <p className="chatContent">{message.body}</p>
//     </div>
//     <button className="openChatButton">
//       <img src="forwardArrow.png" alt="Open Chat" />
//     </button>
//   </div>
// ))
// ) : (
//   <h6>No Messages</h6>
// )}
