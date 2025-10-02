import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { SOCKET_BACKEND_URL } from "../constants/api";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const initializeSocket = () => {
    if (!socket) {
      // const newSocket = io("https://hla-backend.onrender.com");
      const newSocket = io(SOCKET_BACKEND_URL);
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return newSocket;
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };
  // const [isSocketEnabled, setIsSocketEnabled] = useState(false);

  // useEffect(() => {
  //   console.log("inside socket useEffect")
  //   if (isSocketEnabled) {
  //     console.log("inside if isSocketEnabled");
  //     // const newSocket = io("http://localhost:3000");
  //     const newSocket = io("https://hla-backend.onrender.com");
  //     if (newSocket) {
  //       newSocket.on("connect", () => {
  //         console.log("inside if newSocket ");
  //       });
  //       setSocket(newSocket);
  //     }
  //     return () => newSocket.close();
  //   }
  // }, [isSocketEnabled]);

  return (
    <SocketContext.Provider
      value={{ socket, initializeSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
