import AppError from "../utils/AppError.js";

import {
  createMessage,
  getMessagesByRoom,
} from "../repositories/message.repository.js";

import { getMembership } from "../repositories/room.repository.js";

export const sendMessageService = async ({ roomId, senderId, content }) => {

  console.log(
    "Service Input:",
    {
      roomId,
      senderId,
      content,
    }
  );
  
  const membership = await getMembership({
    roomId,
    userId: senderId,
  });

  console.log("roomId:", roomId);

  console.log("senderId:", senderId);

  console.log("membership:", membership);

  if (!membership) {
    throw new AppError("Join room first", 403);
  }

  return await createMessage({
    roomId,
    senderId,
    content,
  });
};

export const getMessagesService = async ({ roomId, userId, page, limit }) => {
  const membership = await getMembership({
    roomId,
    userId,
  });

  if (!membership) {
    throw new AppError("Join room first", 403);
  }

  const offset = (page - 1) * limit;

  return await getMessagesByRoom({
    roomId,
    limit,
    offset,
  });
};
