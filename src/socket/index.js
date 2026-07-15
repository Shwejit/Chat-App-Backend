import { Server } from "socket.io";
import socketAuth from "./socketAuth.js";

let io;

export const initSocket = (
  server
) => {

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketAuth);

  return io;
};

export const getIO = () => io;