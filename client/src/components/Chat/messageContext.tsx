import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import { fetchAll } from "../../utils/messageAPI";

// Define the type of the context value
interface MessageContextType {
  chatList: any[]; // Replace with a more specific type if possible
  setChatList: React.Dispatch<React.SetStateAction<any[]>>; // State updater function type
}

// Create the context with an initial value of null
export const MessageContext = createContext<MessageContextType>({
  chatList: [],
  setChatList: () => {},
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socket = useContext(SocketContext);
  const [chatList, setChatList] = useState<any[]>([]); //2d array

  useEffect(() => {
    const getAllChats = async () => {
      fetchAll().then((response) => {
        setChatList(response);
        response.map((res: any) => {
          socket.emit("join", res._id, (callback: any) => {
            if (response.status == "400") {
              console.log("Unable to join room");
            }
          });
        });
      });
    };
    getAllChats();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (data: any) => {
      setChatList((prevChatList) =>
        prevChatList.map((chat) =>
          chat._id === data.chatId
            ? { ...chat, messages: [...chat.messages, data] }
            : chat
        )
      );
    };
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <MessageContext.Provider value={{ chatList, setChatList }}>
      {children}
    </MessageContext.Provider>
  );
};
