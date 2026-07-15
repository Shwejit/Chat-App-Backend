import express from "express";

import { register } from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.middleware.js";

import { registerSchema } from "../validations/auth.validation.js";

import { login, getMe, refresh, logout } from "../controllers/auth.controller.js";

import { loginSchema } from "../validations/auth.validation.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/me", verifyToken, getMe);

router.post("/refresh", refresh);

router.post("/logout", logout);

export default router;
