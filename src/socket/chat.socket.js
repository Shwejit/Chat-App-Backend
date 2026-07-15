import { getIO } from "./index.js";
import { sendMessageService } from "../services/message.service.js";

export const registerChatEvents = (socket) => {
  socket.on("send-message", async (data) => {
    try {
      console.log("Message Received:", data);

      const { roomId, content } = data;

      const message = await sendMessageService({
        roomId,
        senderId: socket.user.userId,
        content,
      });

      const io = getIO();

      io.to(roomId.toString()).emit("new-message", message);
    } catch (error) {
      console.error("FULL ERROR:", error);

      socket.emit("error-message", {
        message: error.message,
      });
    }
  });
  socket.on("typing", ({ roomId }) => {
    socket.to(roomId.toString()).emit("user-typing", {
      userId: socket.user.userId,
    });
  });
  socket.on("stop-typing", ({ roomId }) => {
    socket.to(roomId.toString()).emit("user-stop-typing", {
      userId: socket.user.userId,
    });
  });
};
