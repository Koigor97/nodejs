const http = require("http");

class PushModel {
  constructor(portNum) {
    this.portNum = portNum;
    this.WebSocketServer = require("websocket").server;
    this.connections = [];
    // create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
    this.httpServer = http.createServer();
    //pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res
    this.websocket = new this.WebSocketServer({ httpServer: this.httpServer });
  }

  startListening() {
    this.httpServer.listen(this.portNum, () => {
      console.log(`Server is listening on port ${this.portNum}`);
    });
  }

  websocketOn() {
    this.websocket.on("request", (request) => {
      const connection = request.accept(null, request.origin);
      connection.on("message", (message) => {
        //someone just sent a message tell everybody
        connections.forEach((c) =>
          c.send(
            `User${connection.socket.remotePort} says: ${message.utf8Data}`
          )
        );
      });

      connections.push(connection);
      //someone just connected, tell everybody
      connections.forEach((c) =>
        c.send(`User${connection.socket.remotePort} just connected.`)
      );
    });

    //client code
    //let ws = new WebSocket("ws://localhost:8080");
    //ws.onmessage = message => console.log(`Received: ${message.data}`);
    //ws.send("Hello! I'm client");
  }
}

module.exports = PushModel;
