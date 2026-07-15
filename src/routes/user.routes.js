import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  getPresence
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validate(createUserSchema), createUser);
router.get("/presence/:userId", getPresence);

export default router;
