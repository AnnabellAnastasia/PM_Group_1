import React from 'react';
import './Social.css';

function Social() {
  const friends = [
    { name: "Friend 1", mutualFriends: "714 friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Friend 2", mutualFriends: "502 friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Friend 3", mutualFriends: "273 friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Friend 4", mutualFriends: "533 friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Friend 5", mutualFriends: "725 friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Friend 6", mutualFriends: "77 friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Friend 7", mutualFriends: "6 mutual friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Friend 8", mutualFriends: "24 mutual friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
  ];

  return (
    <div className="social">
      {/* Friend Requests Section */}
      <div className="friend-requests">
        <button className="friend-requests-btn">
          Friend Requests <span className="request-badge">952</span> 
        </button>
        <button className="find-friends-btn">+ Find Friends</button>
      </div>

      <h1>Friends</h1>

      <div className="friend-list">
        {friends.map((friend, index) => (
          <div key={index} className="friend-item">
            <div className="friend-info">
              <img src={friend.imgSrc} alt={friend.name} className="friend-avatar" />
              <div className="friend-details">
                <p className="friend-name">{friend.name}</p>
                <p className="mutual-friends">{friend.mutualFriends}</p>
              </div>
            </div>
            <button className="friend-button">Friends</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Social;
