import React from 'react'
import ReactDOM from 'react-dom'

export class Question extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "Question made by: ",
      this.props.madeBy,
      "div",
      null,
      this.props.question,
      "div",
      null,
      this.props.description
    );
  }
}
