import React, { useEffect, useState, useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
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
    setFriendsList(friendsList.filter((friend) => friend.friendshipID !== friendshipID));
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
            {friendsList.map((friend) => (
              <ListGroup.Item
                key={friend.friendshipID}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{friend.name}</span>
                <div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigateToChat(friend.userID)}
                  >
                    Message
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleRemoveFriend(friend.friendshipID)}
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No friends added yet.</p>
        )}
      </Card.Body>
    </Card>
  );
}
