import React, {
  useState,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
} from "react";

import "./ChatRoom.css";
import ChatPreview from "./ChatPreview";
import Message from "./ChatPreview";
import ChatDetail from "./ChatDetail";
import { fetchAll } from "../../utils/messageAPI";
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
  //for opening new chat
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
    const getChats = async () => {
      setChatList(await fetchAll());
    };
    getChats();
    if (!chatList) setIsNewOpen(true);
  }, [chatList]);

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
            <div className="chatFooter">
              <button className="newChat" onClick={openNew}>
                New Chat
              </button>
            </div>
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

export default ChatModal;
