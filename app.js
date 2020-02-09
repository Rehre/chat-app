"use strict";

const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public" + "/index.html");
});

const server = require("http").createServer(app);

const PORT = process.env.PORT || 7777;
server.listen(PORT, () => {
  console.log(`Server listening in PORT: ${PORT}`);
});

let userCount = 0;
const io = socket(server);
io.on("connection", socket => {
  userCount += 1;
  io.emit("user-count", userCount);

  socket.on("disconnect", () => {
    userCount -= 1;
    io.emit("user-count", userCount);
  });

  socket.on("message-from-client", data => {
    socket.broadcast.emit("message-from-server", data);
  });
});
