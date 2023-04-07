const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/hi", (req, res) => {
  res.send("Hi");
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (message) => {
    console.log(message);
  });
});

server.listen(5000, () => {
  console.log("App listening at port 5000....");
});
