const fs = require("fs");
const http = require("http");

/////////////////////////////////////////////////////////////
// FILES
// Blocking synchronous way
// const dataRecieved = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(dataRecieved);

// const textOut = `This is the data recieved: ${dataRecieved}\nTime recieved was around: ${Date()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// Non-blocking asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         if (err) console.log("An error occured saving the file");
//         else console.log("The file has been saved");
//       });
//     });
//   });
// });

// console.log("Testing...");

//////////////////////////////////////////////////////////////
// SERVER
