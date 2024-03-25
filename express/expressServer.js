const path = require("path");
const fs = require("fs");

//////////////////////////////////
const express = require("express");
// NODEJS is the language
// Express is node, a node module
const app = express();
app.use(express.json());
const port = 5055;

const getAllTours = () => {
  const filePath = path.join(`${__dirname}`, "data", "test.json");
  const file = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(file);
  return data;
};

const tours = getAllTours();
// the app instance has few methods:
// 1. get() | GET -> the default for a browser
// 2. post() | POST | CREATE
// 3. delete() | DELETE
// 4. put() | PUT | UPDATE (a new document or data)
// 5. patch() | PATCH | UPDATE (update parts of the already saved document)

app.get("/api/v1/tours", (req, res) => {
  // Express handles the basic headers (status code, mime-type)
  res.status(200).json({
    status: "success",
    results: tours.length,
    tours,
  });
  // Express also handles the end().
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
