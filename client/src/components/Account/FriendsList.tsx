import React, { useEffect, useState, useContext } from "react";
import { Button, Card, ListGroup, Image } from "react-bootstrap";
import { getFriends, removeFriend } from "../../utils/userAPI";
import { AlertContext } from "../ContextWrapper";

interface FriendsListProps {
  userID: string;
}

export default function FriendsList({ userID }: FriendsListProps) {
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const { setPageAlert } = useContext(AlertContext); // Use AlertContext for notifications

  // Fetch friends when the component loads
  useEffect(() => {
    async function fetchFriends() {
      if (userID) {
        const friends = await getFriends(userID); // Fetch friends list
        console.log("Fetched Friends:", friends); // Debugging fetched friends
        if (friends) {
          setFriendsList(friends);
        } else {
          setPageAlert({ error: "Failed to load friends.", success: "" });
        }
      }
    }
    fetchFriends();
  }, [userID, setPageAlert]);

  // Function to remove a friend
  async function handleRemoveFriend(friendshipID: string) {
    await removeFriend(userID, friendshipID, setPageAlert); // Pass userID, friendshipID, and alert function
    setFriendsList(friendsList.filter((friend) => friend._id !== friendshipID));
  }

  // Function to navigate to messaging system
  function navigateToChat(friendId: string) {
    window.location.href = `/messages/${friendId}`; // Redirect to Gabriel's messaging system
  }

  return (
    <Card className="mt-4">
      <Card.Header>
        <h5>Friends List</h5>
      </Card.Header>
      <Card.Body>
        {friendsList.length > 0 ? (
          <ListGroup>
            {friendsList.map((friend) => {
              console.log("Friend:", friend); // Debug to inspect each `friend`
              return (
                <ListGroup.Item
                  key={friend._id} // Use `_id` as the unique key
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    {/* Profile Picture */}
                    <Image
                      src={`http://localhost:8080/images/${
                        friend.user?.image || "default-profile.png"
                      }`}
                      alt={`${friend.user?.firstName || "Unknown"} ${
                        friend.user?.lastName || "User"
                      } profile`}
                      roundedCircle
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                      }}
                    />
                    {/* Friend's Name */}
                    <span>
                      {`${friend.user?.firstName || "Unknown"} ${
                        friend.user?.lastName || "User"
                      }`}
                    </span>
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigateToChat(friend.user?._id)}
                    >
                      Message
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleRemoveFriend(friend._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <p>No friends added yet.</p>
        )}
      </Card.Body>
    </Card>
  );
}
