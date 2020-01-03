'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

class Username extends React.Component {
  constructor(props){
    super(props);
  }
  changeUid() {
    console.log("ok");
  }
  render() {
    let b = "./imgs/" + this.props.board + ".png"
    return (
      <div className="usersname">
        <div>{this.props.name}</div>
        <div className="board">
          <img src={b}></img>
        </div>
      </div>
    );
  }
}

class Profileimage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let source = "./imgs/" + this.props.source + ".png";
    return (
      <div className="pfp"><img src={source}></img></div>
    );
  }
}

class Description extends React.Component {
  constructor(props) {
    super(props);
  }
  changeDesc() {
    console.log("ok 2");
  }
  render() {
    return (
      <div className="desc">
        {this.props.content}
      </div>
    );
  }
}

export class Profile extends React.Component {
  render() {
    return (
      <div>
        <Username name={this.props.name} board={this.props.board}/>
        <Profileimage source={this.props.source} />
        <Description content={this.props.content} />
      </div>
    )
  }
}
