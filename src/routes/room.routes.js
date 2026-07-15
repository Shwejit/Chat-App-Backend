import { Router } from "express";

import {
  createRoom,
  joinRoom,
  leaveRoom,
  getMyRooms,
} from "../controllers/room.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { createRoomSchema } from "../validations/room.validation.js";

const router = Router();

router.post("/", verifyToken, validate(createRoomSchema), createRoom);

router.post("/:roomId/join", verifyToken, joinRoom);

router.post("/:roomId/leave", verifyToken, leaveRoom);

router.get("/", verifyToken, getMyRooms);

export default router;
