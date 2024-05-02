import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Connect to the server

function ChatPage() {
  const [room, setRoom] = useState("General");
  const [newRoom, setNewRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [room]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chatMessage", { room, message });
      setMessage("");
    }
  };

  const handleRoomChange = (e) => {
    e.preventDefault();
    if (newRoom) {
      setRoom(newRoom);
      setNewRoom("");
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="container">
      <h2>Chat Room - {room}</h2>
      <div className="chat-room-selection">
        <form onSubmit={handleRoomChange}>
          <input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="Create or switch room..."
            required
          />
          <button type="submit">Join</button>
        </form>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export default ChatPage;
