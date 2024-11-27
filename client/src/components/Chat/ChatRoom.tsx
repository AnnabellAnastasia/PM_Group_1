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
import { MessageContext, MessageProvider } from "./messageContext";

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
  // const [chatList, setChatList] = useState<any[]>([]); //2d array
  // for opening new chat
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
  const openNew = () => setIsNewOpen(true);
  const closeNew = () => setIsNewOpen(false);
  const { chatList, setChatList } = useContext(MessageContext);

  // //for child component
  // const [change, setChange] = useState<boolean>();

  // const updateChange = (callback: any) => {
  //   setChange(callback);
  // };
  // //end of this block of changes

  useLayoutEffect(() => {
    setState({
      left: (triggerRef?.current?.getBoundingClientRect().left || 0) - 436,
      top: (triggerRef?.current?.offsetTop || 0) + 48,
    });
  }, [triggerRef]);

  useEffect(() => {
    console.log("chatlist from message context", chatList);
  });

  // useEffect(() => {
  //   const getAllChats = async () => {
  //     console.log("get all chats called");
  //     fetchAll().then((response) => {
  //       setChatList(response);
  //       // response.map((res: any) => {
  //       //   socket.emit("join", res._id, (callback: any) => {
  //       //     console.log(callback.status);
  //       //   });
  //       // });
  //     });
  //   };
  //   getAllChats();
  // }, [change]); //recent change (was [])

  if (!isOpen) return null;
  else {
    console.log("chat opened");
    return (
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
    );
  }
};

interface Messages {
  body: string;
  creator: any;
  chatId: any;
}

interface Message {
  _id: any;
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
  const [list, setList] = useState<any[]>([]);
  const { chatList, setChatList } = useContext(MessageContext);
  // const [socketOn, setSocketOn] = useState<boolean>(true);

  // useEffect(() => {
  //   if(!socket) return;
  //   if(!socketOn) return;

  //   const handleReceiveMessage = (data: any) => {
  //     console.log("handle recieve messages on");
  //     const msg = messages.find((msg) => msg._id == data.chatId);
  //     if(msg) {
  //       const newMsg = msg.messages
  //       newMsg.push(data);
  //       msg.messages = newMsg;
  //     }
  //   };

  //   socket.on("receive_message", handleReceiveMessage);
  // }, [socket]);

  useEffect(() => {
    setList(messages);
    console.log("chatList from messages context in message preview", chatList);
  }, [messages]);

  //tell parent component to make another api call
  const [change, setChange] = useState({ newMessages: [] });
  const changeFromChild = (callback: any) => {
    // setChange(callback);
    if (callback.length > 0) {
      const msg = messages.find((msg) => msg._id == callback[0].chatId);
      if (msg) {
        msg.messages = callback;
        console.log("messages after push", msg.messages);
      }
    }
  };

  const handleOpenChatDetail = async (event: any) => {
    // let rawConvo = event.target.getAttribute("message-list-key");
    // if(!rawConvo) {
    const rawConvo = (event.target as HTMLElement)
      .closest(".chatPreviewContainer")
      ?.getAttribute("message-list-key");
    if (rawConvo) {
      const convo = JSON.parse(rawConvo);
      setSelectedConvo(convo);
      setIsDetailOpen(true);
      setSelectedChatId(convo._id);
    }
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
              isNew={false}
            ></ChatDetail>
          ) : (
            <>
              <div className="chatMiddle">
                {chatList &&
                  chatList.map(
                    (convo: Message) =>
                      Array.isArray(convo.messages) &&
                      convo.messages.length > 0 && (
                        <div
                          key={convo.messages[0].chatId}
                          className="chatPreviewContainer"
                          message-list-key={JSON.stringify(convo)}
                          data-key={convo.messages[0].chatId}
                          onClick={handleOpenChatDetail}
                        >
                          <div className="senderIcon">
                            {/* Placeholder for Profile Icon */}
                          </div>
                          <div className="chatPreview">
                            {user.firstName == convo.user1.firstName ? (
                              <h6 className="chatSender">
                                {convo.user2.firstName}{" "}
                                {convo.user2.lastName}
                              </h6>
                            ) : (
                              <h6 className="chatSender">
                                {convo.user1.firstName}{" "}
                                {convo.user1.lastName}
                              </h6>
                            )}
                            <p className="chatContent">
                              {
                                convo.messages[
                                  convo.messages.length - 1
                                ].body
                              }
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
