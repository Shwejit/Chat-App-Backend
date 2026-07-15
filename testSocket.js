import { io } from "socket.io-client";

const socket = io(
  "http://localhost:3000",
  {
    extraHeaders: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidmFzdUBnbWFpbC5jb20iLCJpYXQiOjE3ODQxNDA4MDUsImV4cCI6MTc4NDE0MTcwNX0.2sdXu_i6mGFmepTb7EwXLzBD9C6A4225G1jUrig65ro",
    },
  }
);

socket.on("connect", () => {
  console.log("CONNECTED");
});

socket.on("connect_error", (err) => {
  console.log("ERROR:", err.message);
});