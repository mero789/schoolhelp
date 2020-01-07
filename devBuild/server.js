const express = require("express");
const app = express();
const server1 = require("./app.js");

server1.listen(process.env.PORT || 2000);
console.log("[SERVER]: started");
