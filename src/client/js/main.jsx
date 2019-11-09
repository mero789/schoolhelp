import React from 'react';
import ReactDOM from 'react-dom'
import {Question, idgetter} from './libs/questions.js'
import {Page} from './libs/getpage.js'

const client = require("./libs/ask.js");

(function getQuestions() {
  if(window.location.href == "http://localhost:2000/") {
    ReactDOM.render(
      <Question />,
      document.getElementById('questions')
    );
  }
})();

function goTo(location) {
  window.location.href = "./" + location;
}

//event listeners
if(window.location.href == "http://localhost:2000/") {
  console.log("Yes");
  document.getElementsByClassName('ask')[0].addEventListener("click", () => {
    goTo("ask");
  });
  document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:2000/api/posts")
      .then(results => {
        return results.json();
      }).then(data => {
        let ids = idgetter(data);
        for(let i = 0; i < ids.length;i ++) {
          document.getElementsByClassName('question')[i].addEventListener("click", () => {
            goTo("getpage?id=" + ids[i]);
          });
        }
      });
  });
} else if(window.location.href == "http://localhost:2000/ask") {
  console.log("Ask away");
  document.getElementsByClassName('submit')[0].addEventListener("click", () => {
    let desc = document.getElementsByTagName('textarea')[0].value,
    q = document.getElementsByClassName('questionTitle')[0].value;

    const sendOb = {
      question: q,
      desc: desc
    };
    client.sendQuestion(sendOb);
  });
} else if(window.location.href.indexOf("getpage") > -1) {
  console.log("Viewing question");
  ReactDOM.render(
    <Page />,
    document.getElementById('questionContent')
  );
} else if(window.location.href == "http://localhost:2000/login") {
  /**
  *@author Ameer Hamoodi <ahamoodi178@gmail.com>
  *@license
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:

  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  */


  const c = document.createElement('canvas'),
  ctx = c.getContext("2d");
  document.body.appendChild(c);
  class Circle1 {
    constructor() {
      this.x = 100;
      this.y = 100;
      this.r = Math.floor(Math.random() * 15) + 5;
      this.color = "#6432a8";
      this.spdX = (Math.random() * 0.5) - 0.5;
      this.spdY = (Math.random() - 0.5) * 0.5;
    }
    update() {
      this.x += this.spdX;
      this.y += this.spdY;

      if(this.x > c.width || this.x < 0) {
        this.spdX = -this.spdX;
      }
      if(this.y > c.height || this.y < 0) {
        this.spdY = -this.spdY;
      }
    }
    render() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  class Circle2 {
    constructor() {
      this.x = window.innerWidth;
      this.y = window.innerHeight;
      this.r = Math.floor(Math.random() * 15) + 5;
      this.color = "#6432a8";
      this.spdX = (Math.random() * 0.5) - 0.5;
      this.spdY = (Math.random() - 0.5) * 0.5;
    }
    update() {
      this.x += this.spdX;
      this.y += this.spdY;

      if(this.x > c.width || this.x < 0) {
        this.spdX = -this.spdX;
      }
      if(this.y > c.height || this.y < 0) {
        this.spdY = -this.spdY;
      }
    }
    render() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  let cA = [];
  for(let i = 0; i < 25; i++) {
    cA.push(new Circle1());
  }
  for(let i = 0; i < 25; i++) {
    cA.push(new Circle2());
  }
  let dt, now, last;

  c.width = window.innerWidth;
  c.height = window.innerHeight;

  now = Date.now();

  function up() {
      cA.forEach(function(element) {
        element.update();
      });
      last = Date.now();
      dt = last - now;
      now = last;
    }

    setInterval(up, 1000 / dt);

  function anim() {
      window.requestAnimationFrame(anim);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for(let i = 0; i < cA.length; i++) {
        cA[i].render();
      }
    }
    anim();
}
