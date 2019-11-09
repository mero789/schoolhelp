'use strict';
import React from 'react'
import ReactDOM from 'react-dom'

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null
    };
  }
    componentDidMount() {
      let request = new XMLHttpRequest(),
      url = "/api/page",
      id = { id: window.location.href.split("?id=")[1] };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(id));
      let page = null;

      request.onload = () => {
        let res = JSON.parse(request.response)[0],
          pg = (
            <div className="q-content">
              <div className="q-page-title">
                {res.question}
                <div className="author"><span>Asked by:</span> {res.madeBy}</div>
                <div className="sq right green">
                  <span> {res.votes} </span>
                  <div>votes</div>
                </div>
              </div>
              <div className="q-description">
              {res.description}
              </div>
            </div>
          );
          console.log(res);
        this.setState({page: pg});
      };
    }
    render() {
      return (this.state.page);
    }
}
