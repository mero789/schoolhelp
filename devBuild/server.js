const express = require("express");
const app = express();
const server1 = require("./app.js");
const server2 = require("./socketserver.js");

server1.listen(process.env.PORT || 2000);
server2.listen(82);
console.log("[SERVER]: started");
