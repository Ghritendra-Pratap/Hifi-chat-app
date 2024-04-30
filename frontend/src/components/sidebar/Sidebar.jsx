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
  const { setConversationUser } = useConversationContext();

  const setParticipants = (chatToUserId) => {
    if (chatToUserId) {
      setConversationUser([authUser._id, chatToUserId]);
      return;
    }
  };

  const handleSearchClick = async () => {
    try {
      if (!searchVal) {
        // If search value is empty, reset to display all users
        await fetchUser(); // Reset to original list of users
      } else {
        // Filter users based on search value
        const response = await axios.get("/api/user", {
          headers: { authorization: authUser.token },
        });
        const filteredUsers = response.data.filter((user) =>
          user.username.toLowerCase().includes(searchVal.toLowerCase())
        );
        setAllUsers(filteredUsers);
      }
    } catch (error) {
      console.error("Error while searching users:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user", {
        headers: { authorization: authUser.token },
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
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
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button onClick={handleSearchClick}>search</button>
        <div className="searchIcon"></div>
      </div>
      <div className="userlist">
        {allUsers.map((user) => (
          <div key={user._id}>
            <div className="user-content">
              <div className="user-pic">
                <img src={user.profilepic} alt="photo" />
              </div>
              <div className="user-name" onClick={() => setParticipants(user._id)}>
                <div className="namee">{user.username}</div>
                <div className="lastmsg" style={{ fontSize: 10 }}>
                  {user.username}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
