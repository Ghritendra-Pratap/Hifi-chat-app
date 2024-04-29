import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from '../context/AuthContext.jsx'
import { ConversationContextProvider } from '../context/ConversationContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConversationContextProvider>
          <App />
      </ConversationContextProvider>
      
    </AuthContextProvider>
    
  </React.StrictMode>,
)
