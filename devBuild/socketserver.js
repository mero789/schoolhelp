const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/chat/index.html")
});

app.use(express.static(__dirname + "/client/chat", {
  extensions: ['html', 'htm']
}));

let USER_LIST = [];

class User {
  constructor(username, socket) {
    this.messages = [];
    this.name = username;
    this.socket = socket;
    this.room = "/";
  }
}


//namespace deffinitions
const math = io.of("/math"),
  biology = io.of("/bio"),
  chemistry = io.of("/chem"),
  english = io.of("/eng"),
  physics = io.of("/phys"),
  history = io.of("/hist"),
  computerScience = io.of("compsci");


io.on("connection", function(socket) {
  console.log("[SOCKET-SERVER]: connection");

  socket.on("init", function(data) {
    if(!data) {
      USER_LIST.push(new User("Guest", socket))
    } else {
      USER_LIST.push(new User(data, socket));
    }
  });


});

module.exports = server;
