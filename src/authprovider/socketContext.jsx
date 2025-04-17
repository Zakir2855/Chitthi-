import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../socket/socket";
import { cardClasses } from "@mui/material";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const user = useSelector((state) => state.userInfo);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUser] = useState();

  useEffect(() => {
    if (user?.id) {
      socket.connect();

      socket.on("connect", () => {
        // console.log("Socket connected:", socket.id);
        socket.emit("setup", user.id); //  sending user data to backend
        setIsConnected(true);
      });
      socket.on("online", (userMap) => {
        setOnlineUser(userMap);
        // console.log(userMap,"online users");
      });
      socket.on("disconnect", () => {
        // console.log("Socket disconnected");
        setIsConnected(false);
      });
    }

    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, [user.id, socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected,onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
