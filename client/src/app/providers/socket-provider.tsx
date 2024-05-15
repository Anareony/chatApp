"use client";

import { ReactNode, createContext, useContext } from "react";
// import { SocketContext, socket } from "./socket";
import { Socket, io } from "socket.io-client";

export const socket = io("ws://localhost:4000/chat", {
  withCredentials: true,
  autoConnect: false,
});

export const SocketContext = createContext<Socket>(socket);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
