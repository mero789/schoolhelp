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
    this.room = "general"
  }
}

class Message {
  constructor(message, by) {
    this.content = message;
    this.author = by;
  }
}

let rooms = {
  general: [],
  bio: [],
  chem: [],
  phys: [],
  eng: [],
  math: [],
  hist: []
}

function getUserWithName(uid) {
  for(let i = 0; i < USER_LIST.length; i ++) {
    if(USER_LIST[i].name == uid) {
      return USER_LIST[i]
    }
  }
}

function getUserWithSocket(sock) {
  for(let i = 0; i < USER_LIST.length; i ++) {
    if(USER_LIST[i].socket.id == sock) {
      return USER_LIST[i]
    }
  }
}

function init(room, socket) {
  let initPack = rooms[room];
  socket.emit("init", initPack);
}

io.on("connection", function(socket) {
  console.log("[SOCKET-SERVER]: connection");

  socket.join("general");
  socket.room = "general";

  socket.on("init", function(data) {
    if(!data) {
      console.log("[SOCKET-SERVER]: bad data provided");
    } else {
      USER_LIST.push(new User(data, socket));
    }
    init(socket.room, socket);
  });

  socket.on("message", function(data) {
    let user = getUserWithSocket(socket.id);
    if(user == undefined) {
      socket.emit("content", {message: "ERROR"});
    }else {
      message(user.name, data.message, socket.room);
      console.log("[SOCKET-SERVER]: message recieved to room " + socket.room + " processing...");
    }

  });

  socket.on("changeRoom", function(data) {
    changeRooms(socket, data);
    console.log("[SOCKET-SERVER]: recieved request to change room to: " + data);
  });
});


function message(user, message, room) {
  rooms[room].push(new Message(message, user));
  io.to(room).emit("content", {type: 1, message: message, user: user});
  let us = getUserWithName(user);
}

function changeRooms(socket, room) {
  socket.leave(socket.room);
  socket.join(room);
  console.log("[SOCKET-SERVER]: changed room to " + room);
  socket.room = room;
  init(socket.room, socket);
}

module.exports = server;
