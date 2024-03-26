const path = require("path");
const fs = require("fs");

//////////////////////////////////
const express = require("express");
const helmet = require("helmet");

const port = 5055;
const app = express();
// NODEJS is the language
// Express is node, a node module
app.use(express.json());
app.use(helmet());

// function that returns all the tours
const getAllTours = () => {
  const filePath = path.join(`${__dirname}`, "data", "test.json");
  const file = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(file);
  return data;
};

// saving the return value to a const variable
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

///////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
