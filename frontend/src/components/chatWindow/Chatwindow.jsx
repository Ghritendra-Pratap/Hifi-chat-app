import React, { useEffect, useState, useRef } from "react";
import "./chatwindow.css";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import Realtime from "../hooks/Realtime";
import MessageList from "./MessageList"
import ChatInput from "./ChatInput";
import { useSocketContext } from "../../../context/socketContext";

const Chatwindow = ({ context }) => {
  const { authUser } = useAuthContext();
  const {onlineUsers} = useSocketContext();
  const [receiverData, setReceiverData] = useState();
 
  const [conversation, setConversation] = useState();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const msgContainerRef = useRef(null); // Reference for the message container

 

  const fetchConversation = async () => {
    const msg = await axios.get(
      "/api/chat/" + context[1],
      {
        headers: { authorization: authUser.token },
      }
    );
    setConversation(msg.data);
  };

  const sendMessage = async () => {
    if (message || image) {
      const res = await axios.post(
        "/api/chat/send/" + context[1],
        { message, image },
        {
          headers: { authorization: authUser.token },
        }
      );
      fetchConversation();
      setMessage("");
      setImage("");
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

  const handleImage = (event) => {
    const selectedImage = event.target.files[0];
    setFileToBase(selectedImage);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    if (context) {

      getReceiverData();
      fetchConversation();
      setMessage("");
      setImage("");
    }
  }, [context]);

  // Realtime(conversation, setConversation );

  useEffect(() => {
    // Scroll to the bottom of the message container when conversation updates
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(); 
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
            <div className="name-space">{receiverData.fullname}</div>
            <div className="status-space" style={{ fontSize: 10 }}>
              {onlineUsers.includes(context[1]) ? <div><img src="/activedot2.png" className="" style={{height: "8px" , width:"8px"}}/> online </div> : "offline"}
            </div>
          </div>
        </div>
      )}

      <div className="msg-container" ref={msgContainerRef}>    
          {conversation && <MessageList conversation={conversation} />}
      </div>

      <ChatInput
        message={message}
        image={image}
        setMessage={setMessage}
        setImage={setImage}
        sendMessage={sendMessage}
        handleImage={handleImage}
        handleKeyPress={handleKeyPress}
        receiverData={receiverData}
      />
    </div>
  );
};

export default Chatwindow;
