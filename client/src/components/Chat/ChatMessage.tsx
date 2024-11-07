import React from "react";

export default function MessagesList({ messageObj }: any) {
  console.log("rendering messages");
  return (
    <div className="messageBoxSender" key={messageObj._id}>
      <p className="content">{messageObj.body}</p>
    </div>
  );
}
