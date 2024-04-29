import {createContext, useContext , useState} from 'react'


export const ConversationContext = createContext()

export const useConversationContext = () =>{
    return useContext(ConversationContext)
}
export const ConversationContextProvider = ({children})=>{
    const [conversationUser , setConversationUser] = useState();
    return <ConversationContext.Provider value={{conversationUser , setConversationUser}}>{children}</ConversationContext.Provider>
}