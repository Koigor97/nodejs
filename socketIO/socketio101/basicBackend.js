const express = require("express");
const socketio = require("socket.io");

const port = 6050;
const app = express();

app.use(express.static("public"));

const expressServer = app.listen(port, () => {
  console.log(`Express server is live on port: ${port}`);
});
const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(`${socket.id}, has connected`);
  socket.emit("messageFromServer", { data: "Welcome to the socket server" });
  socket.on("messageFromClient", (data) => {
    console.log(data);
  });
});
