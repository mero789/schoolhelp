'use strict';
import React from 'react'
import ReactDOM from 'react-dom'

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: []
    };
    componentDidMount() {
      let id = window.location.href.split("?id= ")[1];
      console.log("[COMPONENT]: id of page = " + id);
      fetch("/api/page?id=" + id)
        .then(results => {
          return results.json()
        }).then(data => {
          let title = data.title,
            content = data.description,
            votes = data.votes,
            owner = data.madeBy,
            answers = data.answers,
            accepted = data.accAnswer;

            const page = (
              <div className="questionView">
              </div>
            )
        })
    }
}
