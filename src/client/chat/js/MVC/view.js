'use strict';
import React from 'react'
import ReactDOM from 'react-dom'

const model = require("./model.js");

class ChatName extends React.Component {
  render() {
    return (<div className='chatname'>
      <span>#</span>{this.props.label}
      </div>
    );
  }
}

class ChatSection extends React.Component {
  render() {
    let name = "section";
    if(this.props.active == "true") {
      name += " active";
    }

    return (
      <div className={name}>
        <ChatName label ={this.props.label} />
      </div>
    )
  }
}

export class Section extends React.Component {
  render () {
    let ren = [];

    for(let i = 0; i < this.props.label.length; i++) {
      let thing = this.props.label[i];
      ren.push(<ChatSection label={thing} />)
    }
    return (
      <div className="sec">
        {ren}
      </div>
    )
  }
}
