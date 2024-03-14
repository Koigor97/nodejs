const fs = require("fs");

class SyncAndAsync {
  constructor(filePath) {
    this.filePath = filePath;
  }

  synchronousWorkload() {
    console.log("1");
    const res = fs.readFileSync(this.filePath);
    console.log("file:" + res);
    console.log("2");
  }

  asynchronousWorkload() {
    console.log("1");
    fs.readFile(this.filePath, (err, data) => console.log(data.toString()));
    console.log("2");
  }
}

module.exports = SyncAndAsync;
