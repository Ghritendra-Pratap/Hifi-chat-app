import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css";
import { useAuthContext } from "../../../context/AuthContext";
import { useConversationContext } from "../../../context/ConversationContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { authUser } = useAuthContext();
  const [searchVal, setSearchVal] = useState("");
  const {setConversationUser} = useConversationContext()


  const setParticipants=(chatToUserId)=>{
    if(chatToUserId){
      setConversationUser([authUser._id , chatToUserId])
      return;
    }
    
    
  }
  const handleSearchClick = () => {
    if (!searchVal) {
      // If search value is empty, reset to display all users
      setAllUsers(allUsers);
    } else {
      // Filter users based on search value
      const filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchVal.toLowerCase())
      );
      setAllUsers(filteredUsers);
    }
  };
  

  const fetchUser = async () => {
    const users = await axios.get("http://localhost:5000/api/user", {
      headers: { authorization: authUser.token },
    });
    setAllUsers(users.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);



  return (
    <div className="sidebar">
      <div className="sidebar-title"> Chats</div>
      <div className="search">
        <input
          type="text"
          className="searchName"
          placeholder="search"
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button onClick={handleSearchClick}>search</button>
        <div className="searchIcon"></div>
      </div>
      <div className="userlist">
        {
          allUsers.map((users) => (
            <div key={users._id}>
              <div className="user-content">
                <div className="user-pic">
                  <img src={users.profilepic} alt="photo" />
                </div>
                <div className="user-name" onClick={()=>setParticipants(users._id)}>
                  <div className="namee">{users.username}</div>
                  <div className="lastmsg" style={{ fontSize: 10 }}>
                    {users.username}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Sidebar;
