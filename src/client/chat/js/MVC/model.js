//imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Message, ArrMessage } from './view.js'
import io from 'socket.io-client';

//requires
const socket = io('http://localhost:82');
const controller = require("./controller.js");

//model structure
let messageArray = [];
let currentChan = 'general';

let init = () => {
  let name = prompt("Enter your username");
  if(name !== "" || typeof name !== "undefined") {
    socket.emit("init", name)
  } else {
    socket.emit("init", false);
  }
}

(() => {
  socket.on("content", (data) => {
    if(data.type == 1) {
      messageArray.push(<Message name={data.user}  data={data.message} />);
      messageArray.reverse();
      ReactDOM.render(<ArrMessage messages={messageArray} />, document.getElementsByClassName('messages')[0]);
    }
  })
})();

let sendMessage = () => {
  let data = document.getElementById('message').value;
  socket.emit('message', {message: data, channel: currentChan.name});
  document.getElementById('message').value = '';
}

let setActive = (name) => {
  document.getElementById(name).classList.add("active");
  document.getElementById(currentChan).classList.remove("active");
  currentChan = name;

  document.getElementsByClassName('glyph')[0].innerHTML = "<span>#</span>" + fullNames[name];
}

let changeChannel = {
  general: () => {
    socket.emit("changeRoom", "general");
    setActive("general");
  },
  eng: () => {
    socket.emit("changeRoom", "eng");
    setActive("eng");
  },
  math: () => {
    console.log("Loading");
    socket.emit("changeRoom", "math");
    setActive("math");
  },
  chem: () => {
    socket.emit("changeRoom", "chem");
    setActive("chem");
  },
  bio: () => {
    socket.emit("changeRoom", "bio");
    setActive("bio");
  },
  phys: () => {
    socket.emit("changeRoom", "phys");
    setActive("phys");
  },
  hist: () => {
    socket.emit("changeRoom", "hist");
    setActive("hist");
  }
}

let chanArray = [
  "general",
  "math",
  "eng",
  "phys",
  "chem",
  "bio",
  "hist"
];

let fullNames = {
  general: "General",
  math: "Math",
  eng: "English",
  phys: "Physics",
  chem: "Chemistry",
  bio: "Biology",
  hist: "History"
}
//controller parts
controller.load(init);

controller.addListener("click", document.getElementById('send'), sendMessage);
chanArray.forEach(item => {
  controller.addListener("click", document.getElementById(item), changeChannel[item]);
});
