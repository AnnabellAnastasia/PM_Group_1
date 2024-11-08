import React from "react";
import { UserContext } from "../ContextWrapper";
import { useContext } from "react";

export default function MessagesList({ messageObj }: any) {
  const { user } = useContext(UserContext);
  console.log("rendering messages");
  return (
    <div className="messageBoxSender" key={messageObj._id} id={(messageObj.creator == user.id) ? "you" : "other"}>
      <p className="content">{messageObj.body}</p>
    </div>
  );
}
