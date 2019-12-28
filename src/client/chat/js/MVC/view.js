'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

class User extends React.Component {
  render() {
    return (
      <span className="from">
        {this.props.name}
      </span>
      )
  }
}

class Contents extends React.Component {
  render () {
    return (
      <div className="contents">
        {this.props.data}
      </div>
    )

  }
}

export class Message extends React.Component {
  render () {
    return (
      <div className="message">
        <User name={this.props.name} />
        <Contents data={this.props.data} />
      </div>
    )
  }
}

export class ArrMessage extends React.Component {
  render () {
    return this.props.messages;
  }
}
