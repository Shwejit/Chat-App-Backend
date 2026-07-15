import jwt from "jsonwebtoken";

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.headers.authorization;

    console.log("Token Received:", token);

    if (!token) {
      return next(new Error("Authentication Error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    socket.user = decoded;

    next();
  } catch (error) {
    next(new Error("Authentication Error"));
  }
};

export default socketAuth;
