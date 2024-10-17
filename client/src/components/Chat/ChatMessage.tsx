import React from "react";

export default function MessagesList({ messageKey, messageObj }: any) {
  return (
    <div className="messageBoxSender" key={messageKey}>
      <p className="content">{messageObj.body}</p>
    </div>
  );
}

// export default function MessagesList({messages}:MessagesData) {
//     messages.map((message) => {
//         <div className="messageBoxSender">
//             <p className="content">{message.content}</p>
//           </div>
//     });
// }

// function ChatMessage({ message }) {
//   return (
//     <div className="messageContainer">
//       <p>
//         {message.user}: {message.text}
//       </p>
//     </div>
//   );
// }

// export interface Message {
//   id: number;
//   sender: string;
//   body: string;
// }

// export interface MessagesData {
//   messages: Message[];
// }
