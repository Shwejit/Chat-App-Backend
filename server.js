import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/socket/index.js";
import { registerChatEvents } from "./src/socket/chat.socket.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = initSocket(server);

io.on("connection", (socket) => {
  // console.log("User Connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId.toString());

    console.log(`User joined room ${roomId}`);
  });

  registerChatEvents(socket);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
