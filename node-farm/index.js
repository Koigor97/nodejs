const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const fillInCardTemplate = require("./modules/replaceTemplate");
/////////////////////////////////////////////////////////////
// FILES
// Blocking synchronous way
// const dataRecieved = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(dataRecieved);

// const textOut = `This is the data recieved: ${dataRecieved}\nTime recieved was around: ${Date()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// Non-blocking asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return;
  const dataObject = JSON.parse(data1);
  console.log(dataObject);
});

// console.log("Testing...");
//////////////////////////////////////////////////////////////
// SERVER

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overview-template.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product-template.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/card-template.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  /////////////////////////////////////////////////////////
  //   OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObject
      .map((el) => fillInCardTemplate(cardTemplate, el))
      .join("");

    const output = overviewTemplate.replace("{%PRODUCT-CARDs%}", cardsHtml);
    res.end(output);
  }
  /////////////////////////////////////////////////////////////
  //   PRODUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = fillInCardTemplate(productTemplate, product);
    res.end(output);
  }
  //////////////////////////////////////////////////////////////
  //   API PAGE
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  /////////////////////////////////////////////////////////////
  //   NOT FOUND PAGE
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server activated: Listening to requests on port 8000");
});
