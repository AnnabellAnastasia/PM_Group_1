import React, {
  useState,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
  useContext,
} from "react";
import { SocketContext, socket } from "../SocketContext";
import "./ChatRoom.css";
import ChatDetail from "./ChatDetail";
import { fetchAll, fetchMessages } from "../../utils/messageAPI";
import NewChat from "./NewChat";
import { UserContext } from "../ContextWrapper";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
}

const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const socket = useContext(SocketContext);
  const [state, setState] = useState({ top: 0, left: 0 });
  const [chatList, setChatList] = useState<any[]>([]); //2d array
  // for opening new chat
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
  const openNew = () => setIsNewOpen(true);
  const closeNew = () => setIsNewOpen(false);

  useLayoutEffect(() => {
    setState({
      left: (triggerRef?.current?.getBoundingClientRect().left || 0) - 436,
      top: (triggerRef?.current?.offsetTop || 0) + 48,
    });
  }, [triggerRef]);

  useEffect(() => {
    const getAllChats = async () => {
      console.log("get all chats called");
      fetchAll().then((response) => {
        setChatList(response);
        response.map((res: any) => {
          socket.emit("join", res._id, (callback: any) => {
            console.log(callback.status);
          });
        });
      });
    };

    getAllChats();
  }, []);

  if (!isOpen) return null;
  else {
    console.log("chat opened");
    return (
      <SocketContext.Provider value={socket}>
        <div
          className="chatContainer"
          style={{ top: state.top, left: state.left }}
        >
          {!isNewOpen ? (
            <>
              <div className="chatHeader">
                <h4 className="chatTitle">Messages</h4>
                <button className="closeChat" onClick={onClose}>
                  <img src="close.png"></img>
                </button>
              </div>
              <ChatPreview messages={chatList} />
              {/* <div className="chatFooter">
                <button className="newChat" onClick={openNew}>
                  New Chat
                </button>
              </div> */}
            </>
          ) : (
            <>
              <div className="chatHeader">
                <h4 className="chatTitle">New Message</h4>
                <button className="closeChat" onClick={onClose}>
                  <img src="close.png"></img>
                </button>
              </div>
              <NewChat isOpen={isNewOpen} onClose={closeNew} />
            </>
          )}
        </div>
      </SocketContext.Provider>
    );
  }
};

interface Messages {
  body: string;
  creator: any;
  chatId: any;
}

interface Message {
  messages: Messages[];
  user1: { firstName: string; lastName: string; image: any };
  user2: { firstName: string; lastName: string; image: any };
}
interface ChatMessagePreviewProps {
  messages: Message[];
}

const ChatPreview: React.FC<ChatMessagePreviewProps> = ({ messages }) => {
  const [selectedChatId, setSelectedChatId] = useState<any>();
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
  const openNew = () => setIsNewOpen(true);
  const closeNew = () => setIsNewOpen(false);
  const socket = useContext(SocketContext);
  const [selectedConvo, setSelectedConvo] = useState<any>([]);
  const { user } = useContext(UserContext);

  const handleOpenChatDetail = async (event: any) => {
    const rawConvo = event.target.getAttribute("message-list-key");
    const convo = JSON.parse(rawConvo);
    setSelectedConvo(convo);
    setIsDetailOpen(true);
  };

  const closeChatDetail = () => {
    setSelectedChatId(null);
  };

  useEffect(() => {}, [messages]);

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
              passChatList={selectedConvo}
              isNew={false}
            ></ChatDetail>
          ) : (
            <>
              <div className="chatMiddle">
                {messages &&
                  messages.map(
                    (messageList: Message) =>
                      messageList.messages.length > 0 && (
                        <div
                          key={messageList.messages[0].chatId}
                          className="chatPreviewContainer"
                          message-list-key={JSON.stringify(messageList)}
                          data-key={messageList.messages[0].chatId}
                          onClick={handleOpenChatDetail}
                        >
                          <div className="senderIcon">
                            {/* Placeholder for Profile Icon */}
                          </div>
                          <div className="chatPreview">
                            {user.firstName == messageList.user1.firstName ? (
                              <h6 className="chatSender">
                                {messageList.user2.firstName}{" "}
                                {messageList.user2.lastName}
                              </h6>
                            ) : (
                              <h6 className="chatSender">
                                {messageList.user1.firstName}{" "}
                                {messageList.user1.lastName}
                              </h6>
                            )}
                            <p className="chatContent">
                              {messageList.messages[messageList.messages.length -1].body}
                            </p>
                          </div>
                          <button className="openChatButton">
                            <img src="forwardArrow.png" alt="Open Chat" />
                          </button>
                        </div>
                      )
                  )}
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

export default ChatModal;
