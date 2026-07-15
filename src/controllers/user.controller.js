import { getAllUsers, getUserById } from "../repositories/user.repository.js";
import {
  createUserService,
  getPresenceService,
} from "../services/user.service.js";

import asyncHandler from "../utils/asyncHandler.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUserService(name, email, password);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPresence = asyncHandler(async (req, res) => {
  const user = await getPresenceService(req.params.userId);

  res.json(user);
});
