import { error } from "console";

export async function fetchMessages() {
    const response = fetch(`http://localhost:8080/messages`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
	})
    .then((response) => {
        if (!response.ok) {
            console.error(`An error has occurred fetching messages: ${response.statusText}`);
            return;
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