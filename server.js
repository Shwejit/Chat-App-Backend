import http from "http";
import app from "./src/app.js";
import { initSocket,getIO } from "./src/socket/index.js";
import { registerChatEvents } from "./src/socket/chat.socket.js";
import onlineUsers from "./src/socket/onlineUsers.js";
import { updateLastSeen } from "./src/repositories/user.repository.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = initSocket(server);

io.on("connection", (socket) => {
  // console.log("User Connected");

  const userId = socket.user.userId;

  onlineUsers.set(userId, socket.id);

  const io = getIO();

  io.emit("user-online", {
    userId,
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId.toString());

    console.log(`User joined room ${roomId}`);
  });

  registerChatEvents(socket);

  socket.on("disconnect", async () => {
    // console.log("User Disconnected:", socket.id);
    onlineUsers.delete(socket.user.userId);

    await updateLastSeen(
      userId
    );

    io.emit("user-offline", {
      userId: socket.user.userId,
    });
    
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
