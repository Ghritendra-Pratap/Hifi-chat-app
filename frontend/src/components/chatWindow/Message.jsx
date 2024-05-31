// Message.js
import React from "react";
import { useAuthContext } from "../../../context/AuthContext";

const Message = ({ msg }) => {
    const { authUser } = useAuthContext();
  return (
    <div className={`msgwindow ${msg.senderId === authUser._id ? "sent" : "received"}`}>
          <div
              className={`message-wrapper ${
                msg.senderId === authUser._id ? "sent" : "received"
              }`} // Set the class based on sent or received
              key={msg._id}
            >
              

              {msg.image && (
                <div className="image" >
                  <img className=""
                    src={msg.image}
                    style={{
                      width: "auto",
                      height: "auto",
                      maxHeight: 400,
                      maxWidth: 300,
                      minHeight:100,
                      minWidth:80,
                      borderRadius: 0,
                      padding:0,
                      margin :0 
                    }}
                  />
                </div>
              )}
              {msg.message && <div className="message">{msg.message}</div>}
            </div>
            <div className="timestamp">
                {(() => {
                  const date = new Date(msg.createdAt);
                  const hours = date.getHours();
                  const minutes = date.getMinutes();
                  const ampm = hours >= 12 ? "PM" : "AM";
                  const formattedHours = hours % 12 || 12;
                  return `${formattedHours}:${
                    minutes < 10 ? "0" : ""
                  }${minutes} ${ampm}`;
                })()}
              </div>
    </div>
  );
};

export default Message;
