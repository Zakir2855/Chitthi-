import React, { memo, useContext, useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { deepOrange } from "@mui/material/colors";
import { auth } from "../authprovider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../store/actions/message.action";
import { SocketContext } from "../authprovider/socketContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ClearIcon from "@mui/icons-material/Clear";
import ClipLoader from "react-spinners/ClipLoader";
import formatLastSeen from "../utility/time";

function ChatsData() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const {
    screenWidth,
    theme,
    setShowPaint,
    showPaint,
    selectedUser,
    Host,
    setShowImage,
  } = useContext(auth);
  //
    let MsgImage = useRef(); //refernce of message image cz value don't work as intended there
  //icon handler
  const handleIconClick = () => {
    MsgImage.current.click(); // trigger hidden input
  };
  //
  const { onlineUsers } = useContext(SocketContext);
  const { socket } = useContext(SocketContext);
  const userInformation = useSelector((state) => state.userInfo);
  const chat = useSelector((state) => state.chatContainer.chatMainData);
  const messages = useSelector((state) => state.Chats);
  const [currentMessages, setCurrentMessages] = useState([]);
  useEffect(() => {
    setCurrentMessages(messages.chats);
    console.log(messages.chats)
  }, [messages]);
  //checking online user+++++++++++
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    let id;
    if (selectedUser) {
      id = selectedUser;
      console.log(id, "???????????");
      if (id in onlineUsers) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    }
  }, [selectedUser, onlineUsers]);
  //
  const [mssgLoading, setMssgLoading] = useState(false);

  const [image, setImage] = useState("");
  const [imagePreview, setPreview] = useState(""); //to be sent mssg preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file); //create image url from an image file
      setPreview(previewUrl);
    }
    //
  };

  // Rerouting to dashboard on screen change
  useEffect(() => {
    if (screenWidth > 600) {
      navigate("/dashboard");
    }
  }, [screenWidth, navigate]);

  // Logging chat data for testing purposes
  // useEffect(() => {
  //   console.log(userInformation);

  //   console.log(chat, "inchatsData");
  // }, [chat]);
  //
  const [input, setInput] = useState(""); //mssg input
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  //multipart message sending
  function sendMessage() {
    setMssgLoading(true);
    const formData = new FormData();
    formData.append("text", input);
    formData.append("image", image);
    fetch(`${Host}/mssg/sendMessage/${selectedUser}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        socket.emit(
          "personalMessage",
          selectedUser,
          userInformation.id,
          res.data
        );
        // dispatch(fetchChats(selectedUser));
        setCurrentMessages((pre) => [...pre, res.data]);
        // lastMessage.current?.scrollTo({ behavior: "smooth" });
        setMssgLoading(false);
        setInput("");
        setImage("");
        setPreview("");
        MsgImage.current.value = "";
      })
      .catch((err) => alert(err));
  }
  // receive message
  useEffect(() => {
    if (!socket || !userInformation?.id) return;

    // const handler = (fromUser) => {
    //   dispatch(fetchChats(fromUser));
    // };
    const handler=(fromUser,mssg)=>{
      setCurrentMessages((pre)=>[...pre,mssg]);
    }

    socket.on("personally", handler);
    return () => {
      socket.off("personally", handler); // cleanup
      setShowPaint(true);
    };
  }, [socket, selectedUser, userInformation?.id]);

  //
  //scrolling to latest message
  const lastMessage = useRef(); //to scroll to current message
  const chatContentRef = useRef(null); //for chat container
  useEffect(() => {
    if (chatContentRef.current && lastMessage.current) {
      const container = chatContentRef.current;
      const scrollHeight = lastMessage.current.offsetTop;
      container.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages,currentMessages]);
  //showing message image++++++++++++++++++++++
  function imageViewer(dp) {
    setShowImage(dp);
    navigate("/image");
  }
  //c=time stamp
  function mssgTime(time) {
    let date = new Date(time);
    let min = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return min;
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div className="chat_page">
      {!showPaint ? (
        <div className={theme ? "starter_div dark" : "starter_div"}>
          <img src="/resources/Main_logo.jpg" alt="optional" />
          <p className="slogan">the simple, the smart</p>
          <p>
            <b>tap on a contact to start conversation</b>
          </p>
        </div>
      ) : (
        <>
          <header className={theme ? "chat_header dark" : "chat_header"}>
            <Avatar
              onClick={() => imageViewer(chat.avatar)}
              src={chat.avatar}
              sx={{ bgcolor: deepOrange[500] }}
            >
              {chat.name}
            </Avatar>
            {isOnline ? <span style={{ color: "red" }}>Online</span> :<span style={{color:"red"}}> {formatLastSeen(chat.lastOnline)}</span>}
            <h2>{chat.Name}</h2>
          </header>
          {/* ---------- */}
          <div
            className={theme ? "chat_content dark" : "chat_content"}
            id="chat_content"
            ref={chatContentRef}
          >
            {/* Chat messages ++++++++++++ */}
            {mssgLoading && (
              <ClipLoader
                color="#4f46e5"
                style={{ color: "#4f46e5", width: "100%", zIndex: "5" }}
                loading={mssgLoading}
                size={35}
              />
            )}
            {messages.chatsAvailable && currentMessages.length > 0
              ? currentMessages.map((single, index) => {
                  return (
                    // using react fragment to use key here
                    <React.Fragment key={index}>
                      <div
                        className={
                          single.senderId == userInformation.id
                            ? "sent"
                            : "received"
                        }
                      >
                        {single.image ? (
                          <figure onClick={() => imageViewer(single.image)}>
                            <img src={single.image} alt="image loading" />
                            <figcaption>{single.text} </figcaption>
                          </figure>
                        ) : (
                          single.text
                        )}
                        <span
                          style={{ fontSize: "0.5rem", marginLeft: "0.3rem" }}
                        >
                          {mssgTime(single.createdAt)}
                        </span>
                      </div>
                      {index === currentMessages.length - 1 && (
                        <div ref={lastMessage} className="scroll-anchor" />
                      )}
                    </React.Fragment>
                  );
                })
              : "Start a conversation"}

            {/* loader between messages */}
            {mssgLoading && (
              <div className="message-loader">
                <ClipLoader color="#4f46e5" size={30} />
              </div>
            )}
          </div>
          {/* ---------------------------------------------- */}
          <div className={theme ? "chat_footer dark" : "chat_footer"}>
            {imagePreview ? (
              <div className="image_preview">
                <img
                  src={imagePreview}
                  style={{ width: "100px", zIndex: "2" }}
                />{" "}
                <ClearIcon
                  className="svg"
                  onClick={() => setPreview("")}
                ></ClearIcon>
              </div>
            ) : (
              ""
            )}
            <input
              className={theme ? " dark" : ""}
              id="msg_txt"
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && (input || image)) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <input
              id="msg_img"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={MsgImage}
            />
            <AddPhotoAlternateIcon
              id="msg_icon"
              onClick={handleIconClick}
            ></AddPhotoAlternateIcon>
            {(input || image) && (
              <button className="msg_btn" onClick={sendMessage}>
                Send
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(ChatsData);
