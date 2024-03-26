// http is a core node module
const http = require("http");
// ws is 3rd party module
const websocket = require("ws");
// port number
const port = 6050;

// creating a server
const server = http.createServer((req, res) => {
  res.end("Connected Successfully");
});

// creating a websocket server
const wss = new websocket.WebSocketServer({ server });
wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  ws.send("Welcome to WebSocket");
  ws.on("message", (data) => {
    console.log(data.toLocaleString());
  });
});

server.listen(port);
