import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../socket/socket";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const user = useSelector((state) => state.userInfo);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUser] = useState([]);//for online users 
//
  useEffect(() => {
    if (user?.id) {
      socket.connect();
      socket.on("connect", () => {
        socket.emit("setup", user.id);
        setIsConnected(true);
      });

      socket.on("online", (userMap) => {
        setOnlineUser(userMap);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      // Handle tab/browser close
      const handleBeforeUnload = () => {
        socket.disconnect();
      };

      window.addEventListener("beforeunload", handleBeforeUnload);//evetn listener for browser closing

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        socket.disconnect();
        setIsConnected(false);
      };
    }
  }, [user?.id, socket]);
//
  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
