import React from 'react';
import ReactDOM from 'react-dom'
//import Question from './libs/questions.jsx'

var reqUID = new XMLHttpRequest(),
  reqPost = new XMLHttpRequest();

class Welcome extends React.Component {
  render() {
    return React.createElement(
      null,
      "Hello ",
      this.props.name
    );
  }
}

class Question extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "Question made by: ",
      this.props.madeBy,
      "div",
      null,
      this.props.question,
      "div",
      null,
      this.props.description
    );
  }
}

function init() {
  reqUID.open('GET', "/send", true);
  reqUID.responseType = "text";
  reqUID.send();

  reqPost.open('GET', "/posts", true);
  reqPost.responseType = "text";
  reqPost.send();

  reqUID.onload = () => {
    console.log("[CLIENT]: " + reqUID.response);
  }
  reqPost.onload = () => {
    let d = JSON.parse(reqPost.response)
    ReactDOM.render(React.createElement(Question, d), document.getElementById('questions'));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
