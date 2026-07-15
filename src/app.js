import express from "express";
import healthRouter from "./routes/health.routes.js";
import userRouter from "./routes/user.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use(cookieParser());
app.use("/auth", authRouter);

app.use(healthRouter);
app.use("/rooms", roomRoutes);
app.use("/users", userRouter);
app.use("/rooms", messageRoutes);

export default app;
