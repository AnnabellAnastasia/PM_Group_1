import { error } from "console";
import mongoose from "mongoose";

export async function fetchMessages(messageId: string) {
  const response = fetch(`http://localhost:8080/api/messages/${messageId}`, {
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
      return response.json();
    }
  });

}

//save new messages to db
export async function closeMessage(event: any, messagesList: any[]) {
  event.preventDefault();
  console.log(messagesList[0]);
  try {
    const response = await fetch(
      `http://localhost:8080/api/messages/closeMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
        },
        body: JSON.stringify(messagesList), // Convert the messages list to string
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

export async function fetchAll() {
  try {
    console.log('fetch all called');
    const response = await fetch(`http://localhost:8080/api/messages/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    fetch(`http://localhost:8080/api/messages/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      console.log(res);
    })
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function newChat(user1: any, user2: any) {
  try {
    const users = {
      _id1: user1,
      _id2: user2,
    };
    const response = await fetch(`http://localhost:8080/api/messages/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
      credentials: "include",
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
    }
    else {
      const data = await response.json();
      if(data.length) {
        const parsedData = JSON.parse(data);
        return parsedData;
      }
      return data.chatId;
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}
