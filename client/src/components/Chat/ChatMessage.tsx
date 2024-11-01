import React from "react";

export default function MessagesList({ messageKey, messageObj }: any) {
  return (
    <div className="messageBoxSender" key={messageKey}>
      <p className="content">{messageObj.body}</p>
    </div>
  );
}
