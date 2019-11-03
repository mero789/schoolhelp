import React from 'react';
import ReactDOM from 'react-dom'
import {Question, idgetter} from './libs/questions.js'
const client = require("./libs/ask.js");

(function getQuestions() {
  if(window.location.href == "http://localhost:2000/") {
    ReactDOM.render(
      <Question />,
      document.getElementById('questions')
    );
  }
})();

function goTo(location) {
  window.location.href = "./" + location;
}

//event listeners
if(window.location.href == "http://localhost:2000/") {
  console.log("Yes");
  document.getElementsByClassName('ask')[0].addEventListener("click", () => {
    goTo("ask.html");
  });
  fetch("http://localhost:2000/posts")
    .then(results => {
      return results.json();
    }).then(data => {
      let ids = idgetter(data);
      for(let i = 0; i < ids.length;i ++) {
        let index = parseInt(ids[i]);
        console.log(index);
        document.getElementsByClassName('questionHeader')[index].addEventListener("click", () => {
          goTo("getpage.html?id=" + index);
        });
      }
      });
} else if(window.location.href == "http://localhost:2000/ask.html") {
  console.log("Ask away");
  document.getElementsByClassName('submit')[0].addEventListener("click", () => {
    let desc = document.getElementsByTagName('textarea')[0].value,
    q = document.getElementsByClassName('questionTitle')[0].value;

    const sendOb = {
      question: q,
      desc: desc
    };
    client.sendQuestion(sendOb);
  });
}
