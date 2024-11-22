import React, { useContext, useEffect, useState } from "react";
import { fetchAllUsersTest } from "../../utils/userAPI";
import "./NewChat.css";
import ChatDetail from "./ChatDetail";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { UserContext } from "../ContextWrapper";

interface INewChat {
  isOpen: boolean;
  onClose: () => void;
}

const NewChat: React.FC<INewChat> = ({ isOpen, onClose }) => {
  const [friendList, setFriendList] = useState<any>([]);
  const { user } = useContext(UserContext);
  //for opening new chat detail
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);
  const [selectedUserId, setSelectedUserId] = useState<any>();
  const [friendName, setFriendName] = useState<string>("");

  useEffect(() => {
    const getFriends = async () => {
      fetchAllUsersTest().then((response) => {
        if(response) {
          let jsonArray:any;
          JSON.parse(response)
          .then((res:any) => {
            jsonArray = res;
          })
          setFriendList(jsonArray);
        }
        
      });
    };
    getFriends();
  }, []);
  if (!isOpen) return null;

  const handleClick = (event: any) => {
    let id = event.target.getAttribute("data-key");
    let friend = event.target.getAttribute("friend-name");
    if (id) {
      console.log(id);
      console.log(user.id);
      setSelectedUserId(id);
      setIsDetailOpen(true);
      setFriendName(friend);
    }
  };

  return (
    <>
      {isDetailOpen ? (
        <ChatDetail
          isNew={true}
          otherUserId={selectedUserId}
          isOpen={isDetailOpen}
          onClose={closeDetail}
          chatUser={friendName}
        />
      ) : (
        <div className="newChatContainer">
          <div className="newTop">
            <button className="closeNewChat" onClick={onClose}>
              Back
            </button>
          </div>
          <div className="newMiddle">
            {friendList && friendList.map((user: any) => {
              return (
                <div
                  className="friendContainer"
                  onClick={handleClick}
                  data-key={user._id}
                  friend-name={user.firstName + " " + user.lastName}
                  key={user.id}
                >
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="newBottom"></div>
        </div>
      )}
      {/* <div className="newTop">
        <button className="closeNewChat" onClick={onClose}>
          Back
        </button>
      </div>
      <div className="newMiddle">
        {friendList.map((user: any) => {
          return (
            <div
              className="friendContainer"
              onClick={handleClick}
              data-key={user._id}
              key={user.id}
            >
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          );
        })}
        {isDetailOpen && (
          <ChatDetail
            isNew={true}
            otherUserId={selectedUserId}
            isOpen={isDetailOpen}
            onClose={closeDetail}
          />
        )}
      </div> */}
    </>
  );
};
export default NewChat;
