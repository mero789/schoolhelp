const express = require("express");
const app = express();
const server1 = require("./app.js");
const server2 = require("./socketserver.js");

server1.listen(2000);
console.log("[SERVER]: started");

server2.listen(82);
console.log("[SOCKET-SERVER]: started");
