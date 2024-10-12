import React from "react";

interface ConversationProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Conversation: React.FC<ConversationProps> = ({isOpen, onClose}) => {
    if(!isOpen) return null;

    return null;
}
export default Conversation;