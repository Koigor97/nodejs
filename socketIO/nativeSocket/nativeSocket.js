let ws = new WebSocket("ws://localhost:6050");

ws.onopen = (event) => {
  console.log(event);
  ws.send("We connected successfully. Let's shake on it");
};

ws.onmessage = (message) => {
  console.log(message.data);
};
