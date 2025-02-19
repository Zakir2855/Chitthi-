import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deepOrange } from "@mui/material/colors";
import { auth } from "../authprovider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ChatsData() {
  const navigate = useNavigate();
  const { screenWidth, theme } = useContext(auth);
  const chat = useSelector((state) => state.chatMainData);
  const [input, setInput] = useState("");

  // Rerouting to dashboard on screen change
  useEffect(() => {
    if (screenWidth > 550) {
      navigate("/dashboard");
    }
  }, [screenWidth, navigate]);

  // Logging chat data for testing purposes
  useEffect(() => {
    console.log(chat, "inchatsData");
  }, [chat]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat_page">
      {!chat ? (
        <div className="starter_div">
          <img src="../resources/Main_logo.jpg" alt="optional" />
          <p className="slogan">the simple, the smart</p>
          <p><b>tap on a chat to start conversation</b></p>
        </div>
      ) : (
        <>
          <header className={theme ? "chat_header dark" : "chat_header"}>
        {screenWidth<550 &&<button className="backArrow"><ArrowBackIcon/></button>}   <Avatar src={chat.avatar} sx={{ bgcolor: deepOrange[500] }}>
              {chat.name}
            </Avatar>
            <h2>{chat.name}</h2>
          </header>
          <div className={theme ? "chat_content dark" : "chat_content"} id="chat_content">
            {/* Chat messages will be rendered here */}
            <p>Hi chats will be here....</p>
          </div>
          <div className={theme ? "chat_footer dark" : "chat_footer"}>
            <input
              className={theme ? " dark" : ""}
              type="text"
              onChange={handleInput}
              placeholder="Type a message..."
            />
            {input ? <button>Send</button> : ""}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatsData;
