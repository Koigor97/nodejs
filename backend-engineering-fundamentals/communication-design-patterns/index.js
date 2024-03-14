const syncAndAsync = require("./sync-Async");
const pushModel = require("./push");

const getFiles = new syncAndAsync("out.txt");
// getFiles.synchronousWorkload();
