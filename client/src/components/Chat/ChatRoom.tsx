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
  const [state, setState] = useState({ top: 0, left: 0 });
  const [chatList, setChatList] = useState<any>([]);
  const [chatDetailList, setChatDetailList] = useState<any[]>([]);//2d array? 
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

  // useEffect(() => {
    
  //   const getChats = async () => {
  //     fetchAll().then((response) => {
  //       if (typeof response === "string") {
  //         JSON.parse(response).then((arr:any) => {
  //           setChatList(arr);
  //         });
  //       } else if(response.messages) {
  //         setChatList(response.messages);
  //       }
  //     });
  //   };

  //   getChats();
  //   // if (!chatList) setIsNewOpen(true);
    
  // }, []);

  useEffect(() => {
    const getAllChats = async() => {
      console.log("get all chats called");
      fetchAll().then((response) => {
        if(typeof response === "string") {
          console.log("parsing response string");
          JSON.parse(response).then((arr:any)=> {
            setChatDetailList(arr);
          })
        } else if (response[0].messages) {
          console.log("directly setting chat detail list");
          setChatDetailList(response);
        } else {
          setChatDetailList(response);
        }
        console.log("api response", response);
      })
    }

    getAllChats();

    // const getAllChatDetails = async() => {
    //   console.log("get all chat details called");
    //   fetchAll().then((response) => {
    //     if (typeof response === "string") {
    //       JSON.parse(response).then((arr:any) => {
    //         setChatList(arr);
    //       });
    //     } else if(response.messages) {
    //       setChatList(response.messages);
    //       console.log("chatlist set");
    //     }
    //     getChatDetailList();
        
    //     })
       
    //   }
    //   const getChatDetailList = async() => {
    //     console.log("set chat detail list called");
    //     const messagePromises = chatList.map((element:any) => {
    //       if(element.chatId) {
    //         console.log("fetching chat");
    //         const id:any = element.chatId;
    //         return fetchMessages(id);
    //       }
    //       return null;
    //     });
    //     let chatDetailListPreliminary = await Promise.all(messagePromises);
    //     chatDetailListPreliminary = chatDetailListPreliminary.filter((elem) => elem !== null);
    //     setChatDetailList(chatDetailListPreliminary);
    //     console.log("getting chat details");
    //     console.log("chatdetaillist", chatDetailListPreliminary);
      // }
      // getAllChatDetails();
      // const messagePromises = chatList.map((element:any) => {
      //   if(element.chatId) {
      //     const id:any = element.chatId;
      //     return fetchMessages(id);
      //   }
      //   return null;
      // })
      // let chatDetailListPreliminary = await Promise.all(messagePromises);
      // chatDetailListPreliminary = chatDetailListPreliminary.filter((elem) => elem !== null);
      // setChatDetailList(chatDetailListPreliminary);
    
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
              <ChatPreview messages={chatDetailList} />
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

interface Message {
  body: string;
  creator: {firstName:string, lastName:string, image:any}
  chatId: string; //should be chat id
}
interface ChatMessagePreviewProps {
  messages: Message[][];
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
  const socket = useContext(SocketContext);
  const [selectedChatList, setSelectedChatList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();

  const handleOpenChatDetail = async(event: any) => {
    // setSelectedMessage(message);
    setLoading(true);
    const id = event.target.getAttribute("data-key");
    const givenList = event.target.getAttribute("message-list-key");
    console.log(messages);
    const list = JSON.parse(givenList)
    setSelectedChatList(list);
    console.log("selected chat list ", selectedChatList);
    setSelectedChatId(id);
    setLoading(false);
    if(!loading) {
      setIsDetailOpen(true);
    }
    
    // if(id && socket) {
    //   socket.emit("join", id);
    // }
  };

  const closeChatDetail = () => {
    setSelectedChatId(null);
  };

  useEffect(() => {
    console.log("messages passed to chat preview", messages);
    console.log("messages from first convo: ", messages[0]);
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
              passChatList={selectedChatList}
              isNew={false}
            ></ChatDetail>
          ) : (
            <>
              <div className="chatMiddle">
                {messages && messages.map((messageList: Message[]) => 
                messageList?.length > 0 && (
                  
                    <div
                    key={messageList[0].chatId}
                    className="chatPreviewContainer"
                    message-list-key={JSON.stringify(messageList)}
                    data-key={messageList[0].chatId}
                    onClick={handleOpenChatDetail}
                    >
                    <div className="senderIcon">
                      {/* Placeholder for Profile Icon */}
                    </div>
                    <div className="chatPreview">
                      <h6 className="chatSender">{messageList[0].creator.firstName} {messageList[0].creator.lastName}</h6>
                      <p className="chatContent">{messageList[0].body}</p>                      
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

export default ChatModal;
