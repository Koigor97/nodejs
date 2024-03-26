const express = require("express");
const socketio = require("socket.io");

const port = 6051;
const app = express();

app.use(express.static("public"));

const expressServer = app.listen(port, () => {
  console.log(`Express server is live on port: ${port}`);
});
const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome to the socket server" });
  socket.on("newMessageToServer", (dataFromClient) => {
    console.log(`Data from client: ${dataFromClient.text}`);
    io.emit("newMessageToClients", { text: dataFromClient.text });
  });
});
