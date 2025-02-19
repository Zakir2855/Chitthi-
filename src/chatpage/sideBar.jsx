import React, { useContext, useEffect, useState ,useCallback} from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { auth } from "../authprovider/AuthProvider";
import { useDispatch } from "react-redux";

const Sidebar = ({ setChatData }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const {theme,screenWidth}=useContext(auth);
  
  // const handleClick=async(chat)=>{
  //   console.log(chat,"async func");
  //  await setChatData(chat);
  //  if(screenWidth <600){
  //   navigate("/chatBoard")}
  // }
  // const handleClick = useCallback((chat) => {
   
  //   localStorage.setItem("chat",JSON.stringify(chat));
  //   setChatData(chat);
  //   if (screenWidth < 600) {
  //     navigate("/chatBoard");
  //   }
  // }, [screenWidth, navigate, setChatData])
//using store+++++++++
const handleClick=(chat)=>{
  dispatch({type:"Data on the way",payload:chat});
  if (screenWidth < 600) {
         navigate("/chatBoard");
     }
};
//
  //
  const chats = [
    {
      id: 1,
      name: "James Potter",
      lastMessage: "Hey! How are you?",
      avatar: "../resources/Main_logo.jpg",
    },
    {
      id: 2,
      name: "Hermione granger",
      lastMessage: "Hi! I'm good. How are you?",
      avatar: "../resources/Main_logo.jpg",
    },
    {
      id: 3,
      name: "Ronn Weisely",
      lastMessage: "Hello! Long time no see.",
      avatar: "../resources/Main_logo.jpg",
    },
    {
      id: 4,
      name: "Voldemort",
      lastMessage: "Hello! Long time no see.",
      avatar: "../resources/Main_logo.jpg",
    },
    {
      id: 5,
      name: "Dumbledore",
      lastMessage: "Hello! Long time no see.",
      avatar: "../resources/Main_logo.jpg",
    },
    {
      id: 6,
      name: "Draco Melfoy",
      lastMessage: "Hello! Long time no see.",
      avatar: "../resources/Main_logo.jpg",
    },
    {
      id: 7,
      name: "Martel sharma",
      lastMessage: "Hello! Long time no see.",
      avatar: "../resources/Main_logo.jpg",
    },
  ];

  return (
    <div className="side_bar">
      <div className="side-bar-header">
        <h2>Chats</h2>
      </div>
      <div className={theme?"side-bar-content dark":"side-bar-content"}>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={theme?"chat_item dark":"chat_item"}
              onClick={()=>handleClick(chat)}
            >
              <div className="chat-avatar">
                <img src={chat.avatar} alt="avatar" />
              </div>
              <div className="chat-info">
                <h3 style={{ color:theme ? "white" : "black" }}>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
