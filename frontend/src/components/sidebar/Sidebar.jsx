import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./sidebar.css";
import { useAuthContext } from "../../../context/AuthContext";
import SidebarUser from "../sidebaruserlist/SidebarUser";


const Sidebar = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { authUser } = useAuthContext();
  const [searchVal, setSearchVal] = useState("");
  

  
  
  const handleSearchClick = async () => {
    try {
      if (!searchVal) {
        await fetchUser(); 
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

  const logout=()=>{
    try{
      localStorage.removeItem("chat-user")
    }catch(err){
      console.log("error in logout :", err)
    }
  }
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
        <img src="/search.png"  className="search-img" onClick={handleSearchClick}/>
        <div className="searchIcon"></div>
      </div>
      <div className="userlist">
        {allUsers.map((user) => (
          <SidebarUser key={user._id} user = {user}/>
        ))}
      </div>
      <div className="logout" style={{bottom:0, margin:"auto"}}>
      <Link to="/" onClick={logout} style={{backgroundColor:"gray"  , borderRadius:"50%" ,}}><img src='/logout.png' style={{ height:"30px"}}/></Link>
      </div>
      
      
    </div>
  );
};

export default Sidebar;
