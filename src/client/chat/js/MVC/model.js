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
const generalParse = {
  eneralgay: "general",

}
const letters = /^[A-Za-z0-9\s]+$/;

function getCookie(cookie) {
  var name = cookie + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ur = decodedCookie.split(';');
  for(var i = 0; i <ur.length; i++) {
    var c = ur[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*let channelParser = () => {
  switch (url) {
    case 'eneralgay':
      currentChan = generalParse(url)
      break;
    default:

  }
}*/

let clearScreen = () => {
  ReactDOM.unmountComponentAtNode(document.getElementsByClassName('messages')[0]);
  messageArray.splice(0, messageArray.length);
}

let init = () => {
  let name = getCookie("username");
  console.log(name);
  if(name.match(letters)) {
    socket.emit("init", name);
  } else {
    alert("You must login to use the chat... Redirecting in 5s");
    setTimeout(window.location.href = "/", 5000);
  }
  //currentChan = channelParser(url);
}

(() => {
  socket.on("init", (data) => {
    for(let i = 0; i < data.length; i++) {
      messageArray.unshift(<Message name={data[i].author} data={data[i].content} />);
    }
    if(messageArray[0] != undefined) {
      ReactDOM.render(<ArrMessage messages={messageArray} />, document.getElementsByClassName("messages")[0]);
    } else {
      console.log("No init pack");
    }
  }), socket.on("content", (data) => {
    if(data.type == 1) {
      messageArray.unshift(<Message name={data.user}  data={data.message} />);
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
    clearScreen();
  },
  eng: () => {
    socket.emit("changeRoom", "eng");
    setActive("eng");
    clearScreen();
  },
  math: () => {
    socket.emit("changeRoom", "math");
    setActive("math");
    clearScreen();
  },
  chem: () => {
    socket.emit("changeRoom", "chem");
    setActive("chem");
    clearScreen();
  },
  bio: () => {
    socket.emit("changeRoom", "bio");
    setActive("bio");
    clearScreen();
  },
  phys: () => {
    socket.emit("changeRoom", "phys");
    setActive("phys");
    clearScreen();
  },
  hist: () => {
    socket.emit("changeRoom", "hist");
    setActive("hist");
    clearScreen();
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
