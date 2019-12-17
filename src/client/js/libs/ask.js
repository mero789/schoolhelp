'use strict';

module.exports.sendQuestion = function(content) {
  let request = new XMLHttpRequest(),
  url = "/api/question";
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(content));
  window.blur();
  request.onload = function() {
    window.location.href = "./";
  }
}

module.exports.sendAnswer = function(content) {
  let request = new XMLHttpRequest(),
  url = "/api/answer";
  request.open("POST", url);
  content.id = window.location.href.split("?id=") [1];
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(content));
  window.blur();
  window.location.href = "./getpage?id=" + content.id;
}
