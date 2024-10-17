import { error } from "console";
import mongoose from "mongoose";

export async function fetchMessages(otherUserId:any) {
    const response = fetch(`http://localhost:8080/messages/${otherUserId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
	})
    .then((response) => {
        if (!response.ok) {
            console.error(`An error has occurred fetching messages: ${response.statusText}`);
            return "-1";
        } else{
            const messages = response.json();
            if(!messages){
                console.warn('no messages found');
            } else {
                console.log("messages", messages);
                return messages;
            }
        }
    });
}

//add loggedInUser
export async function submitMesssage(event:any, newMessage: string, loggedInUser: string, otherUserId: string) {
    event.preventDefault();
    const message = {
        body: newMessage,
        creator: loggedInUser,
        recipient: otherUserId
    };
    let response;
    response = fetch(`http://localhost:8080/messages`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(message),
        credentials: 'include'
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    })
    .catch((error) => {
        console.error("A problem occurred with your fetch operation: ", error);
    });
}

export async function closeMessage(event: any, messagesList: any[]) {
    event.preventDefault();
    let response;
    response = fetch(`http://localhost:8080/messages/closeMessage`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(messagesList),//see if stringify works
        credentials: 'include'
    }).then((response) => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }).catch((error) => {
        console.error("A problem occurred with your fetch operation: ", error);
    });
}