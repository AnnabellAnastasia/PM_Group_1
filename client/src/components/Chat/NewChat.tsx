import React, { useEffect, useState } from "react";
import { fetchAllUsersTest } from "../../utils/userAPI";
import "./NewChat.css";
import ChatDetail from "./ChatDetail";

interface INewChat {
  isOpen: boolean;
  onClose: () => void;
}

const NewChat: React.FC<INewChat> = ({ isOpen, onClose }) => {
  const [friendList, setFriendList] = useState<any>([]);
  //for opening new chat detail
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);

  useEffect(() => {
    const getFriends = async () => {
      fetchAllUsersTest().then((response) => {
        console.log(`json returned before parsing ${response}`);
        const jsonArray = JSON.parse(response);
        console.log(jsonArray);
        setFriendList(jsonArray);
      });
    };
    getFriends();
  }, []);
  if (!isOpen) return null;

  const handleClick = (event:any) => {
    let id = event.target.getAttribute("data-key");
    return <ChatDetail isNewChat otherUserId={id} isOpen={isDetailOpen} onClose={closeDetail}></ChatDetail>
  }

  return (
    <div className="newChatContainer">
      <div className="newTop">
        <button className="closeNewChat" onClick={onClose}>
          Back
        </button>
      </div>
      <div className="newMiddle">
        {friendList.map((user: any) => {
          return (
            <div className="friendContainer" onClick={handleClick} data-key={user._id}>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          );
        })}
      </div>
      <div className="newBottom"></div>
    </div>
  );
};
export default NewChat;
