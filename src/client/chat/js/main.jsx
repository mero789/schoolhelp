//imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Section } from './MVC/view.js'

const model = require("./MVC/model.js");


//render
ReactDOM.render(<Section label={model.rooms} />, document.getElementsByClassName('chats')[0])
