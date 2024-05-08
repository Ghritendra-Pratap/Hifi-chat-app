import React, { useEffect, useState, useRef } from "react";
import "./chatwindow.css";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { useSocketContext } from "../../../context/socketContext";
import Realtime from "../hooks/Realtime";



const Chatwindow = ({ context }) => {
  const { authUser } = useAuthContext();
  const [receiverData, setReceiverData] = useState();
  const [conversation, setConversation] = useState();
  const [message , setMessage] = useState("");
  const msgContainerRef = useRef(null); // Reference for the message container
 
  

  Realtime(conversation , setConversation)
 

  const fetchConversation = async () => {
    const msg = await axios.get(
      "/api/chat/" + context[1],
      {
        headers: { authorization: authUser.token }
      }
    );
    setConversation(msg.data);
    console.log("Converstaion: ",conversation)
  };
 

  const sendMessage = async () => {
    if(message){
      const res = await axios.post("/api/chat/send/"+context[1] , {message} , {
        headers: { authorization: authUser.token }
      }) 
      console.log(res.data)
      fetchConversation();
      setMessage(""); // Clear the message input field after sending
    }
  };

  const getReceiverData = async () => {
    const receiver = await axios.get(
      "/api/user/" + context[1],
      {
        headers: { authorization: authUser.token },
      }
    );
    setReceiverData(receiver.data);
  };

  useEffect(() => {
    if (context) {
      getReceiverData();
      fetchConversation();
      
    }
  }, [context]);

  useEffect(() => {
    // Scroll to the bottom of the message container when conversation updates
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key (submitting the form)
      sendMessage(); // Call sendMessage function when Enter is pressed
    }
  };

  return (
    <div className="chatwindow">
      {receiverData && (
        <div className="tochatwith-title">
          <div className="tochatwith-img">
            <img src={receiverData.profilepic} alt="" />
          </div>
          <div className="namenstatus">
            <div className="name-space">{receiverData.username}</div>
            <div className="status-space" style={{ fontSize: 10 }}>
              Last seen
            </div>
          </div>
        </div>
      )}

      <div className="msg-container" ref={msgContainerRef}>
        {/* Messages are rendered inside this container */}
        {conversation && conversation.map((msg, index) => (
  <div
    className={`msgwindow ${msg.senderId === authUser._id ? 'sent' : 'received'}`} // Set the class based on sent or received
    key={index}
  >
    <div className="message">
    {msg.message}
    </div>
    
    <div className="timestamp">
    {(() => {
    const date = new Date(msg.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  })()}
    </div>
    
   </div>
))}
        
      </div>

      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
        <div className="msginput">
          <input
            type="text"
            className="msginput-field"
            placeholder=" Type message here......"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} 
          />
          
        </div>
      </form>
    </div>
  );
};

export default Chatwindow;
