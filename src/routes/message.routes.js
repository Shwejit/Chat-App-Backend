import { Router }
from "express";

import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  validate,
} from "../middlewares/validate.middleware.js";

import {
  sendMessageSchema,
} from "../validations/message.validation.js";

import {
  sendMessage, getMessages
} from "../controllers/message.controller.js";

const router = Router();

router.post(
  "/:roomId/messages",
  verifyToken,
  validate(
    sendMessageSchema
  ),
  sendMessage
);

router.get(
  "/:roomId/messages",
  verifyToken,
  getMessages
);

export default router;