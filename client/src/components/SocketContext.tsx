import socketio from "socket.io-client";
import dotenv from "dotenv";
import React from "react";
import { createContext } from "react";
dotenv.config();

const uri = process.env.REACT_APP_SERVER_URI || "http://localhost:8080";

export const socket = socketio(uri);
export const SocketContext = React.createContext(socket);