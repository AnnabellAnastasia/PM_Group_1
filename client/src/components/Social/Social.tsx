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

  const suggestedConnections = [
    { name: "Suggested 1", mutualFriends: "10 mutual friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Suggested 2", mutualFriends: "5 mutual friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    { name: "Suggested 3", mutualFriends: "15 mutual friends", imgSrc: "https://static.thenounproject.com/png/65090-200.png" },
    // Add more as needed
  ];

  return (
    <div className="social container py-4">
      {/* Friend Requests Section */}
      <div className="friend-requests d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <button className="friend-requests-btn btn btn-secondary position-relative mb-2">
          Friend Requests <span className="request-badge badge bg-danger position-absolute top-0 start-100 translate-middle">952</span>
        </button>
        <button className="find-friends-btn btn btn-primary mb-2">+ Find Friends</button>
      </div>

      <h1 className="display-6 mb-4">Friends</h1>

      <div className="friend-list row gy-3">
        {friends.map((friend, index) => (
          <div key={index} className="col-md-6">
            <div className="friend-item d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm">
              <div className="friend-info d-flex align-items-center">
                <img src={friend.imgSrc} alt={friend.name} className="friend-avatar rounded-circle me-3" />
                <div className="friend-details">
                  <p className="friend-name h5 mb-1">{friend.name}</p>
                  <p className="mutual-friends text-muted small">{friend.mutualFriends}</p>
                </div>
              </div>
              <button className="friend-button btn btn-outline-secondary btn-sm">Friends</button>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Connections Section */}
      <h1 className="display-6 mt-5 mb-4">Suggested Connections</h1>

      <div className="suggested-connections row gy-3">
        {suggestedConnections.map((suggested, index) => (
          <div key={index} className="col-md-6">
            <div className="suggested-item d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm">
              <div className="suggested-info d-flex align-items-center">
                <img src={suggested.imgSrc} alt={suggested.name} className="friend-avatar rounded-circle me-3" />
                <div className="friend-details">
                  <p className="friend-name h5 mb-1">{suggested.name}</p>
                  <p className="mutual-friends text-muted small">{suggested.mutualFriends}</p>
                </div>
              </div>
              <button className="connect-button btn btn-outline-primary btn-sm">Connect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Social;
