const socket = require("socket.io-client")();
const controller = require("./controller.js");

//model structure
let init = () => {
  let name = prompt("Enter your username");
  if(name !== "" || typeof name !== "undefined") {
    socket.emit("init", name)
  } else {
    socket.emit("init", false);
  }
}

module.exports.init = init;

module.exports.rooms = ['general', 'math', 'biology', 'chemistry', 'physics', 'history', 'english'];

//controller parts
controller.load(init);
