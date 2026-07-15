import { createUser, getUserByEmail } from "../repositories/user.repository.js";

import { hashPassword } from "../utils/password.js";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

import { comparePassword } from "../utils/password.js";

import { getUserById } from "../repositories/user.repository.js";

import jwt from "jsonwebtoken";

export const registerUser = async (name, email, password) => {
  // Step 1
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  // Step 2
  const passwordHash = await hashPassword(password);

  // Step 3
  const user = await createUser(name, email, passwordHash);

  // Step 4
  const payload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  return {
    user,
    accessToken,
    refreshToken,
  };
};
export const loginUser = async ({ email, password }) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const payload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const getCurrentUser = async (userId) => {
  return await getUserById(userId);
};

export const refreshAccessToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const accessToken = generateAccessToken({
    userId: decoded.userId,
    email: decoded.email,
  });

  return accessToken;
};
