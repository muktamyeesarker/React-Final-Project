const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // This should be restricted in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`A user joined room: ${room}`);
    socket
      .to(room)
      .emit("message", `A new user has joined the chat in ${room}`);
  });

  socket.on("chatMessage", ({ room, message }) => {
    io.to(room).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
