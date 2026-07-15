import {
  createRoom,
  addMemberToRoom,
  getMembership,
  removeMemberFromRoom,
  getUserRooms
} from "../repositories/room.repository.js";

import AppError from "../utils/AppError.js";

export const createRoomService = async ({ name, userId }) => {
  const room = await createRoom({
    name,
    createdBy: userId,
  });

  await addMemberToRoom({
    roomId: room.id,
    userId,
  });

  return room;
};
export const joinRoomService = async ({ roomId, userId }) => {
  const membership = await getMembership({
    roomId,
    userId,
  });

  if (membership) {
    throw new AppError("Already joined room", 409);
  }

  return await addMemberToRoom({
    roomId,
    userId,
  });
};
export const leaveRoomService =
async ({
  roomId,
  userId,
}) => {

  const membership =
    await getMembership({
      roomId,
      userId,
    });

  if (!membership) {
    throw new AppError(
      "You are not a member of this room",
      404
    );
  }

  return await removeMemberFromRoom({
    roomId,
    userId,
  });
};

export const getUserRoomsService =
async (userId) => {

  return await getUserRooms(
    userId
  );

};