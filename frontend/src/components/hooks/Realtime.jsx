import React, { useEffect } from 'react'
import { useSocketContext } from '../../../context/socketContext';

const Realtime = (conversation , setConversation ) => {
    const {socket} =useSocketContext();
    console.log("socket: ", socket.id)

    useEffect(()=>{
        socket?.on("newMessage" , (newMessage)=>{
            setConversation([...conversation , newMessage])
      })
      return()=> socket?.off("newMessage");
        }
    
    ,[socket,conversation ,setConversation])

}
  
    


export default Realtime
