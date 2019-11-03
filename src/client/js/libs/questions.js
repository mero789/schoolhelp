'use strict';
import React from 'react'
import ReactDOM from 'react-dom'


export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:2000/posts")
      .then(results => {
        return results.json();
      }).then(data => {

        let questions = data.map((sec) => {
          return (
            <div className="questionHeader">
              Q: {sec.question}
              <hr></hr>
            </div>
          )
        });
        this.setState({questions: questions});
      });
  }
  render() {
    try {
      return (
        this.state.questions
      );
    } catch(e) {
      console.log("[CLIENT]: [ERROR] : " + e)
    }
  }
}

export function idgetter(data) {
  let ide = [];
  for(let i=0; i < data.length; i++) {
    ide.push(data[i].id);
  }
  return ide;
}
