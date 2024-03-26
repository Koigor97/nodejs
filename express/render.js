const path = require("path");

const express = require("express");
const helmet = require("helmet");

const app = express();
const port = 5055;

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());

// setting templetating engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
  res.render("index", { msg: "Success" });
});

///////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
