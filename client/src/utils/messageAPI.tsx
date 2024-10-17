import { error } from "console";
import mongoose from "mongoose";

//get messages between two users - must be fixed.
export async function fetchMessages(otherUserId: any) {
  const response = fetch(`http://localhost:8080/messages/${otherUserId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (!response.ok) {
      console.error(
        `An error has occurred fetching messages: ${response.statusText}`
      );
      return "-1";
    } else {
      const messages = response.json();
      if (!messages) {
        console.warn("no messages found");
      } else {
        console.log("messages", messages);
        return messages;
      }
    }
  });
}

//save new messages to db
export async function closeMessage(event: any, messagesList: any[]) {
  event.preventDefault();

  try {
    const response = await fetch(
      `http://localhost:8080/messages/closeMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messagesList), // Convert the messages list to JSON
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}


//not required with socket.io - will remove
// export async function submitMesssage(
//   event: any,
//   newMessage: string,
//   loggedInUser: string,
//   otherUserId: string
// ) {
//   event.preventDefault();
//   const message = {
//     body: newMessage,
//     creator: loggedInUser,
//     recipient: otherUserId,
//   };
//   let response;
//   response = fetch(`http://localhost:8080/messages`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//     credentials: "include",
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     })
//     .catch((error) => {
//       console.error("A problem occurred with your fetch operation: ", error);
//     });
// }
