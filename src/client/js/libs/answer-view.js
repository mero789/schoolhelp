'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

export class Answer extends React.Component {
  componentDidMount() {
    let request = new XMLHttpRequest(),
    url = "/api/giveAnswers",
    id = { id: window.location.href.split("?id=")[1] };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(id));

    request.onload = () => {
      console.log("[CLIENT]: recieved response...");
      let res = request.response;
      let pg = [];
      res.forEach( item => {
        let respondingElement = (
          <div className="a-container">
            <div className="a-header">
              {item.title}
              <div className="a-author">
                By: {item.madeBy}
              </div>
            </div>
            <div className="a-content">
              {item.description}
            </div>
          </div>
        )
        pg.push(respondingElement);
      })
      this.setState({page: pg});
    }
  }
  render() {
    return (
      this.state.page
    )
  }
}
