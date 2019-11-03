'use strict';

module.exports.sendQuestion = function(content) {
  let request = new XMLHttpRequest(),
  url = "/question";
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(content));
  window.blur();
  request.onload = function() {
    window.location.href = "./";
  }
}
