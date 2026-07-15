import {
  createUser,getUserPresence
} from "../repositories/user.repository.js";

import onlineUsers from "../socket/onlineUsers.js";

export const createUserService = async (
  name,
  email,
  password
) => {

  // Later:
  // hash password

  const user = await createUser(
    name,
    email,
    password
  );

  return user;
};

export const getPresenceService =
async (userId) => {

  const user =
    await getUserPresence(
      userId
    );

  return {
    ...user,
    isOnline:
      onlineUsers.has(userId)
  };
};