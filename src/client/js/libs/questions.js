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
    fetch("/api/posts")
      .then(results => {
        return results.json();
      }).then(data => {
        let len = data.length,
        dis = [],
        getQ = () => {
        for(let i = 0; i < len; i++) {
          let numA = data[i].answer == '' ? 0 : 1;
          dis.push((
            <div className="question">
              <div className="questionHeader">
                <h4 className="title">{data[i].question}</h4><br></br>
              </div>
                <div className="square votes">
                <span>{data[i].votes}</span>
                <div>votes</div>
                </div>
                <div className="square not answers"><span> {numA}</span>
                <div>answer</div>
                </div>
            </div>
          ));
        }
        return dis;
      }
      let questions = getQ();
      this.setState({questions: questions});
    });
  }
  render() {
    try {
      return (
        this.state.questions
      );
      console.log("[RENDERER]: finished");
    } catch(e) {
      console.log("[RENDERER][ERROR] : " + e)
    }
  }
}

export function idgetter(data) {
  let ide = [];
  for(let i=0; i < data.length; i++) {
    console.log("[GETTER]: " + data[i].id)
    ide.push(data[i].id);
  }
  return ide;
}
