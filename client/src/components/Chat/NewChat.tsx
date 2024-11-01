import React from "react";

interface INewChat {
    isOpen: boolean;
    onClose: () => void;
}

const NewChat: React.FC<INewChat> = ({
    isOpen, 
    onClose
  }) => {
    if(!isOpen) return null;
    return (
        <div>
            <button className="closeNewChat" onClick={onClose}>Back</button>
            <h1> hello </h1>
        </div>
    )
}
export default NewChat;