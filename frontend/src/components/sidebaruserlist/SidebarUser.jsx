import React, { useState } from "react";
import { useConversationContext } from "../../../context/ConversationContext";
import { useSocketContext } from "../../../context/socketContext";
import { useAuthContext } from "../../../context/AuthContext";

const SidebarUser = (user) => {  
  const { setConversationUser } = useConversationContext();
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(user.user._id)
  const {authUser} = useAuthContext()

    const setParticipants = () => {
        if (user.user._id) {
          setConversationUser([authUser._id, user.user._id]);
          return;
        }
      };  
  return (
      <div className="user-content">
        <div className="user-pic">
          <img src={user.user.profilepic} alt="photo" />
        </div>
        <div className="user-name" onClick={() => setParticipants()}>
          <div className="namee">{user.user.username}</div>
          <div className="lastmsg" style={{ fontSize: 10 }}>
            {user.user.username} {isOnline ? "on" : "off"}
          </div>
        </div>
      </div>
    
  );
};

export default SidebarUser;
