const http = require("http");
const server = http.createServer((req, res) => {
  res.end("<h1>Wassp</h1>");
  console.log(req);
});

server.listen(3000, () => {
  console.log(`Server is running on port: 3000`);
});
