import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../authprovider/AuthProvider";
import { useDispatch } from "react-redux";
import { fetchChats } from "../store/actions/message.action";
import { SocketContext } from "../authprovider/socketContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, screenWidth, setShowPaint, setSelectedUser, users } =
    useContext(auth);
  const { onlineUsers } = useContext(SocketContext);

  //using store+++++++++
  const handleClick = (chat) => {
    setShowPaint(true);
    setSelectedUser(chat._id);
    //
    if (chat?._id) {
      dispatch(fetchChats(chat._id));
    }
    //
    dispatch({ type: "Data on the way", payload: chat });
    if (screenWidth < 700) {
      setShowPaint(true);
      navigate("/chatBoard");
    }
  };
  //
  function unmounter() {
    if (screenWidth > 700) {
      dispatch({ type: "defaultState" });//clearing messages
      // setShowPaint(false);
    }
  }
  useEffect(() => {
    return () => unmounter();
  }, []);

  return (
    <div className="side_bar">
      <div className="side-bar-header">
        <h2>Contacts</h2>
      </div>
      <div className={theme ? "side-bar-content dark" : "side-bar-content"}>
        <ul>
          {users && users.length >= 1
            ? users.map((chat) => (
                <li
                  key={chat._id}
                  className={theme ? "chat_item dark" : "chat_item"}
                  onClick={() => handleClick(chat)}
                >
                  <div className="chat-avatar">
                    <img
                      src={
                        chat.avatar == ""
                          ? "/resources/default-avatar-profile-icon.jpg"
                          : chat.avatar
                      }
                      alt="avatar"
                    />
                  </div>
                  <div className="chat-info">
                    <h3 style={{ color: theme ? "white" : "black" }}>
                      {chat.Name}
                    </h3>
                   {onlineUsers[chat._id]&& <span
                      style={{
                        height: "8px",
                        width: "8px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>}

                    {/* <p>{chat.lastMessage}</p> */}
                  </div>
                </li>
              ))
            : "NO Users"}
        </ul>
      </div>
    </div>
  );
};

export default memo(Sidebar);
