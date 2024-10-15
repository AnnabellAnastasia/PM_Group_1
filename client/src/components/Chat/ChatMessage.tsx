import React from "react";

// function ChatMessage({ message }) {
//   return (
//     <div className="messageContainer">
//       <p>
//         {message.user}: {message.text}
//       </p>
//     </div>
//   );
// }

export interface Message {
    id: number;
    sender: string;
    content: string;
  }

export interface MessagesData {
    messages: Message[];
}


export default function MessagesList({messages}:MessagesData) {
    messages.forEach((message) => {
        <div className="messageBoxSender">
            <p className="content">{message.content}</p>
          </div>
    });
}