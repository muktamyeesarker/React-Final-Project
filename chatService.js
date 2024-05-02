import io from "socket.io-client";
const socket = io("http://localhost:4000");

export const joinRoom = (room) => {
  socket.emit("joinRoom", room);
};

export const sendMessage = (room, message) => {
  socket.emit("chatMessage", { room, message });
};

export const receiveMessages = (callback) => {
  socket.on("message", (message) => {
    callback(message);
  });
};

export const disconnectSocket = () => {
  socket.off("message");
};
