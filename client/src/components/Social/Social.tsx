import React, { useEffect, useState } from "react";
import "./Social.css";
import {
  acceptFriendRequest,
  declineFriendRequest,
  sendFriendRequest,
  getFriendRequests,
  getFriends,
  getSuggestedConnections,
} from "../../utils/userAPI";
import { UserContext, AlertContext } from "../ContextWrapper";
import { useContext } from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";

function Social() {
  const { user } = useContext(UserContext);
  const { setPageAlert } = useContext(AlertContext);
  const loggedInUserID = user.id ?? "";

  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [suggestedConnections, setSuggestedConnections] = useState([]);

  const fetchSuggestedConnections = async () => {
    setSuggestedConnections(await getSuggestedConnections(loggedInUserID));
  };

  const fetchFriendRequests = async () => {
    setFriendRequests(await getFriendRequests(loggedInUserID));
  };

  const fetchFriends = async () => {
    setFriends(await getFriends(loggedInUserID));
  };

  async function handleLoadSocialData() {
    await fetchFriendRequests();
    await fetchFriends();
    await fetchSuggestedConnections();
  }

  async function handleAcceptFriendRequest(
    requestID: string,
    recipientID: string,
    senderID: string
  ) {
    await acceptFriendRequest(requestID, recipientID, senderID);
    await handleLoadSocialData();
  }

  async function handleDeclineFriendRequest(requestID: string, userID: string) {
    await declineFriendRequest(requestID, userID);
    await handleLoadSocialData();
  }

  async function handleSendFriendRequest(userID: string, suggestedID: string, setPageAlert: Function) {
    await sendFriendRequest(
      userID,
      suggestedID,
      setPageAlert
    )
    await handleLoadSocialData();
  }

  useEffect(() => {
    console.log("suggestedConnections", suggestedConnections);
  }, [suggestedConnections]);
  useEffect(() => {
    console.log("friendRequests", friendRequests);
  }, [friendRequests]);
  useEffect(() => {
    console.log("friends", friends);
  }, [friends]);

  useEffect(() => {
    handleLoadSocialData();
  }, [loggedInUserID]);

  return (
    <Container className="social py-4">
      {/* Friend Requests Section */}
      {friendRequests && friendRequests.length > 0 ? (
        <>
          <h1 className="display-6 mb-4">Friend Requests</h1>
          <div className="friend-list row my-3">
            {friendRequests.map((request: any, index: any) => (
              <div key={index} className="col-md-6">
                <div className="friend-item d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm">
                  <div className="friend-info d-flex align-items-center">
                    <img
                      src={`http://localhost:8080/images/${
                        request.sender.image
                          ? request.sender.image
                          : "blank-profile-picture.png"
                      }`}
                      alt={`${request.sender.firstName} ${request.sender.lastName} profile`}
                      className="friend-avatar rounded-circle me-3"
                    />
                    <div className="friend-details">
                      <p className="friend-name h5 mb-1">{`${request.sender.firstName} ${request.sender.lastName}`}</p>
                    </div>
                  </div>
                  <ButtonGroup>
                    <Button
                      onClick={() =>
                        handleAcceptFriendRequest(
                          request._id,
                          loggedInUserID,
                          request.sender._id
                        )
                      }
                      variant="outline-success"
                      size="sm"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeclineFriendRequest(request._id, loggedInUserID)
                      }
                      variant="outline-danger"
                      size="sm"
                    >
                      Decline
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      <h1 className="display-6 mb-4">Friends</h1>

      <div className="friend-list row my-3">
        {friends && friends.length > 0 ? (
          friends.map((friend: any, index: any) => {
            return (
              <div key={index} className="col-md-6">
                <div className="friend-item d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm">
                  <div className="friend-info d-flex align-items-center">
                    <img
                      src={`http://localhost:8080/images/${
                        friend.user.image
                          ? friend.user.image
                          : "blank-profile-picture.png"
                      }`}
                      alt={`${friend.user.firstName} ${friend.user.lastName} profile`}
                      className="friend-avatar rounded-circle me-3"
                    />
                    <div className="friend-details">
                      <a href={`/account/${friend.user._id}`}>
                        <p className="friend-name h5 mb-1">{`${friend.user.firstName} ${friend.user.lastName}`}</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No friends yet! Send a friend request to make a connection.</p>
        )}
      </div>

      {/* Suggested Connections Section */}
      <h1 className="display-6 mt-5 mb-4">Suggested Connections</h1>

      <div className="suggested-connections row my-3">
        {suggestedConnections &&
          suggestedConnections.map((suggested: any) => (
            <div key={suggested._id} className="col-md-6">
              <div className="suggested-item d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm">
                <div className="suggested-info d-flex align-items-center">
                  <img
                    src={`http://localhost:8080/images/${
                      suggested.image
                        ? suggested.image
                        : "blank-profile-picture.png"
                    }`}
                    alt={`${suggested.firstName} ${suggested.lastName} profile`}
                    className="friend-avatar rounded-circle me-3"
                  />
                  <div className="friend-details">
                    <a href={`/account/${suggested._id}`}>
                      {`${suggested.firstName} ${suggested.lastName}`}
                    </a>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    handleSendFriendRequest(
                      loggedInUserID,
                      suggested._id,
                      setPageAlert
                    )
                  }
                  size="sm"
                  variant="primary"
                >
                  <i className="fa-solid fa-user-plus"></i>
                </Button>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
}

export default Social;
