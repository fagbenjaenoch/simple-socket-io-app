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
  console.log("A user connected....");
  socket.broadcast.emit("new connection");
  socket.on("disconnect", () => {
    console.log("User disconnected");
    socket.broadcast.emit("user disconnection");
  });

  socket.on("chat message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("chat message", msg);
  });
});

server.listen(5000, () => {
  console.log("App listening at port 5000....");
});
