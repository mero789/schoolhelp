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
  checkvote() {
    let id = window.location.href.split("?id=")[1];
    let item = localStorage.getItem(id.toString());

    if(item == null) {
      this.setState({voted: false});
    } else if(item == 0) {
      this.setState({voted: 0})
    } else if(item == 1) {
      this.setState({voted: 1})
    }
  }
  upvote() {
    console.log();
    let url = "/api/vote",
    id = { id: window.location.href.split("?id=")[1] },
    obj = {id: id, voteType: 0};
    if(localStorage.getItem(id.id.toString()) == null) {
      let request = new XMLHttpRequest();
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(obj));
      localStorage.setItem(id.id.toString(), 0);
      this.componentDidMount();
  }
}
  downvote() {
    let url = "/api/vote",
    id = { id: window.location.href.split("?id=")[1] },
    obj = {id: id, voteType: 1};
    if(localStorage.getItem(id.id.toString()) == null) {
      let request = new XMLHttpRequest();
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(obj));
      localStorage.setItem(id.id.toString(), 1);
    }
  }
  componentDidMount() {
      this.checkvote();
      let request = new XMLHttpRequest(),
      url = "/api/page",
      id = { id: window.location.href.split("?id=")[1] };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(id));
      let reportHref = "./report?" + id.id;
      let page = null;

      request.onload = () => {
        console.log(this.state.voted);
        let res = JSON.parse(request.response)[0],
          href = "./answer?id=" + id.id;
          console.log(res);
        let pg = (
            <div className="q-content">
              <div className="q-page-title">
                {res.question}
                <a href={href}><button className="ask">Answer</button></a>
                <div className="author"><span>Asked by:</span> {res.madeBy}</div>
              <div className="vote">
                <button onClick={this.upvote}>
                  <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36" color="">
                    <path d="M2 26h32L18 10 2 26z" fill={(this.state.voted === 0) ? '#6432a8' : "#878787"}></path>
                  </svg>
                </button>
                  <div className="votenum">
                    {res.upvotes - res.downvotes}
                    <div>votes</div>
                  </div>
                  <button onClick={this.downvote}>
                    <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                      <path d="M2 10h32L18 26 2 10z" fill={(this.state.voted === 1) ? '#6432a8' : "#878787"}></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="q-description">
              {res.description}
              </div>
              <div className="q-footer">
                <div className="item">
                <a href={reportHref}><i className="fas fa-flag"></i></a>
                </div>
              </div>
            </div>
          );
          console.log(res.upvotes - res.downvotes);
        this.setState({page: pg});
      };
    }
    render() {
      return (
        this.state.page
      );
    }
}
