'use strict';
import React from 'react'
import ReactDOM from 'react-dom'

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      voted: false
    };
  }
  upvote() {
    let url = "/api/vote",
    id = { id: window.location.href.split("?id=")[1] },
    obj = {id: id, voteType: 0};
    if(localStorage.getItem(id.id.toString()) !== null) {
      this.setState({voted: 0})
    } else {
      let request = new XMLHttpRequest();
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(obj));
      localStorage.setItem(id.id.toString(), 0);
  }
}
  downvote() {
    let url = "/api/vote",
    id = { id: window.location.href.split("?id=")[1] },
    obj = {id: id, voteType: 1};
    if(localStorage.getItem(id.id.toString()) !== null) {
      this.setState({voted: 1})
    } else {
      let request = new XMLHttpRequest();
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(obj));
      localStorage.setItem(id.id.toString(), 1);
    }
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
              <div className="vote">
                <button onClick={this.upvote}>
                  <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36" color="">
                    <path d="M2 26h32L18 10 2 26z" fill={this.state.voted == 0 ? '#6432a8' : "#878787"}></path>
                  </svg>
                </button>
                  <div className="votenum">
                    {res.upvotes - res.downvotes}
                    <div>votes</div>
                  </div>
                  <button onClick={this.downvote}>
                    <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                      <path d="M2 10h32L18 26 2 10z" fill={this.state.voted == 1 ? '#6432a8' : "#878787"}></path>
                    </svg>
                  </button>
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
