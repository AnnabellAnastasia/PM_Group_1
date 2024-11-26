import React, { useState } from "react";
import "./OnlineFriends.css";

interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  image?: string;
}

interface OnlineFriendsProps {
  friends: Friend[];
  onChatClick: (friendId: string) => void;
}

const OnlineFriends: React.FC<OnlineFriendsProps> = ({ friends, onChatClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className="online-friends-sidebar"
      style={{
        height: isCollapsed ? "55px" : "auto",
        minHeight: isCollapsed ? "55px" : "400px",
      }}
    >
      <div className="sidebar-title">
        Online Friends
        <button className="toggle-button" onClick={toggleCollapse}>
          {isCollapsed ? "▼" : "▲"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="friends-list">
          {friends.map((friend) => (
            <div key={friend.id} className="friend" onClick={() => onChatClick(friend.id)}>
              <img
                src={`../images/${
                  friend.image ? friend.image : "blank-profile-picture.png"
                }`}
                alt={`${friend.firstName} ${friend.lastName}'s profile`}
                className="friend-profile-image"
              />
              <span className="friend-name">
                {friend.firstName} {friend.lastName}
              </span>
              <button className="chat-button">Chat</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineFriends;
