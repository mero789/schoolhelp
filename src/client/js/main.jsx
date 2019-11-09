import React from 'react';
import ReactDOM from 'react-dom'
import {Question, idgetter} from './libs/questions.js'
import {Page} from './libs/getpage.js'

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
    goTo("ask");
  });
  document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:2000/api/posts")
      .then(results => {
        return results.json();
      }).then(data => {
        let ids = idgetter(data);
        for(let i = 0; i < ids.length;i ++) {
          document.getElementsByClassName('question')[i].addEventListener("click", () => {
            goTo("getpage?id=" + ids[i]);
          });
        }
      });
  });
} else if(window.location.href == "http://localhost:2000/ask") {
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
} else if(window.location.href.indexOf("getpage") > -1) {
  console.log("Viewing question");
  ReactDOM.render(
    <Page />,
    document.getElementById('questionContent')
  );
}
