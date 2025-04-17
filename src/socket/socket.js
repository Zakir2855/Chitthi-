// src/socket.js
import { io } from 'socket.io-client';
const Host = import.meta.env.VITE_HOST;
const socket = io(Host, {
  autoConnect: false, 
});

export default socket;
