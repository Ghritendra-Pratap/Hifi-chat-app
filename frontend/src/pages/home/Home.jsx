import React, { useState } from 'react'
import './home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Chatwindow from '../../components/chatWindow/Chatwindow'
import { ConversationContextProvider, useConversationContext } from '../../../context/ConversationContext'
const Home = () => {

  const {conversationUser} = useConversationContext()
    
  return (
    <div className='home'>
      <div className="sidebar-item">
      
        <Sidebar/>
      
      </div>
      <div className="chatwindow-item">
        
          <Chatwindow context={conversationUser}/>
        
        
      </div>
    </div>
  )
}

export default Home
