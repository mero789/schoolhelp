'use strict'
import React from 'react'
import ReactDOM from 'react-dom'


export class Answer extends React.Component {
  render() {
    console.log(this.props);
    return (
        <div className="a-container">
          <div className="a-header">
            {this.props.title}
            <div className="a-author">
              By: {this.props.madeBy}
            </div>
          </div>
          <div className="a-content">
            {this.props.description}
          </div>
        </div>
    )
  }
}

export class ArrAnswer extends React.Component {
  render() {
    return this.props.answers
  }
}
