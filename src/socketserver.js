const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const routes = require('routes2.js');

server.listen(82);
console.log("[SOCKET-SERVER]: started");

var SOCKET_LIST = {};
var USER_LIST = {};

app.get("/", function(req, res) {
  res.sendFile("./client/index.html")
});

class User {
  constructor(username) {
    this.messages = [];
    this.name = username;
  }
}

io.on("connection", function(socket) {
  console.log("[SOCKET-SERVER]: connection");
});
