'use strict'
import React from 'react'
import ReactDOM from 'react-dom'


export class Answer extends React.Component {
  render() {
    return (
        <div className="a-container">
          <div className="a-header">
            {this.props.title}
            <div className="a-author">
              <span>Answer by:</span> {this.props.madeBy}
            </div>
            <div className="vote">
              <button>
                <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36" color="">
                  <path d="M2 26h32L18 10 2 26z" fill='#878787' ></path>
                </svg>
              </button>
                <div className="votenum">
                  0
                  <div>votes</div>
                </div>
                <button>
                  <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                    <path d="M2 10h32L18 26 2 10z" fill='#878787'></path>
                  </svg>
                </button>
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
