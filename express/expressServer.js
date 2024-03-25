// NODEJS is the language
// Express is node, a node module
const express = require("express");
const app = express();
const port = 5055;

// '.all' is a method, and it takes 2 args:
// 1. route
// 2. callback to run if the route is requested
app.all("*", (req, res) => {
  // Express handles the basic headers (status code, mime-type) ! Awesome
  res.send("<h1> This is the Home page </h1>");
  // Express also handles the end().
});

// the app instance has few methods:
// 1. get() | GET -> the default for a browser
// 2. post() | POST | CREATE
// 3. delete() | DELETE
// 4. put() | PUT | UPDATE (a new document or data)
// 5. patch() | PATCH | UPDATE (update parts of the already saved document)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
