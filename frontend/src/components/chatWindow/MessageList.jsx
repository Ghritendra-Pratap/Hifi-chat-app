// MessageList.js
import React from "react";
import Message from "./Message";

const MessageList = ({ conversation }) => {
  return (
    <div className="container">
      if(conversation)
      {conversation.length > 0 ?
        conversation.map((msg) => (
          <Message key={msg._id} msg={msg} />
        )): <div className="no-msg"style={{color:"black"}}>No Conversation started ....Start a chat </div>}
    </div>
  );
};

export default MessageList;
