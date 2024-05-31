import React, { useEffect, useState } from "react";
import { useConversationContext } from "../../../context/ConversationContext";
import { useSocketContext } from "../../../context/socketContext";
import { useAuthContext } from "../../../context/AuthContext";
import './sidebaruser.css'

import axios from'axios'

const SidebarUser = (user) => {  
  const { setConversationUser } = useConversationContext();
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(user.user._id)
  const {authUser} = useAuthContext()
  const [lastMessage, setLastMessage] = useState('');

  const getLastMessage = async()=>{
    var message = await axios.get("/api/chat/lastmessage/" + user.user._id, {
      headers: { authorization: authUser.token },
    })
    {message.data && setLastMessage(message.data)}
    console.log("message" , message)
  }
  
    const setParticipants = () => {
        if (user.user._id) {
          setConversationUser([authUser._id, user.user._id]);
          return;
        }
      };  

      useEffect(() => {
        getLastMessage();
      }, [user.user_id]);

  return (
      <div className="user-content">
        <div className="user-pic">
        
          
          <img src={user.user.profilepic} alt="photo" />
          {isOnline ? <img src="/activedot2.png" className="active-status"/> : null}
        </div>
        <div className="user-name" onClick={() => setParticipants()}>
          <div className="namee">{user.user.fullname}</div>
          <div className="lastmsg" style={{ fontSize: 10 , fontWeight:500 }}>
            {lastMessage ? lastMessage : ""}
          </div>
        </div>
      </div>
    
  );
};

export default SidebarUser;
