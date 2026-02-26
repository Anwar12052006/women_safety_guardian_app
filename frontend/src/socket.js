

import { io } from "socket.io-client";

const socket = io("https://new-women-safety-app.onrender.com", {

  transports: ["websocket"],

  autoConnect: true,

  reconnection: true,

  reconnectionAttempts: 5,

  reconnectionDelay: 1000,

});

socket.on("connect", () => {

  console.log("Socket connected:", socket.id);

});

socket.on("disconnect", () => {

  console.log("Socket disconnected");

});

export default socket;

