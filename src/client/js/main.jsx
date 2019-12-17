import React from 'react';
import ReactDOM from 'react-dom'
import { Question, idgetter } from './libs/questions.js'
import { Page } from './libs/getpage.js'

const client = require("./libs/ask.js"),
logs = require("./libs/signin.js");

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

function getCookie(cookie) {
  var name = cookie + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ur = decodedCookie.split(';');
  for(var i = 0; i <ur.length; i++) {
    var c = ur[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//event listeners
if(window.location.href == "http://localhost:2000/") {
  console.log("Yes");
  document.getElementsByClassName('ask')[0].addEventListener("click", () => {
    if(getCookie("username") == "") {
      goTo("login");
    } else {
      goTo("ask");
    }
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
    q = document.getElementsByClassName('questionTitle')[0].value,
    user = getCookie("username");
    console.log(user);
    const sendOb = {
      question: q,
      desc: desc,
      user: user
    };
    client.sendQuestion(sendOb);
  });
} else if(window.location.href.indexOf("getpage") > -1) {
  console.log("Viewing question");
  ReactDOM.render(
    <Page />,
    document.getElementById('questionContent')
  );
  setTimeout(() => {
    console.log(document.getElementsByClassName('ask')[0]);
  }, 2000);
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


  let c = document.createElement('canvas');
  const ctx = c.getContext("2d");
  document.body.appendChild(c);
  class Circle1 {
    constructor() {
      this.x = 100;
      this.y = 100;
      this.r = Math.floor(Math.random() * 15) + 5;
      this.color = "#6432a8";
      this.spdX = (Math.random() * 0.5) - 0.5;
      this.spdY = (Math.random() - 0.5) * 0.5;
      this.alpha = (Math.random() * 0.01) + 1;
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
      if(this.alpha > 0.5) {
        this.alpha -= 0.001;
      } else if(this.alpha < 0.5) {
        this.alpha += 0.001;
      }
    }
    render() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
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
      this.alpha = (Math.random() * 0.01) + 1;
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
      if(this.alpha > 0.5) {
        this.alpha -= 0.001;
      } else if(this.alpha < 0.5) {
        this.alpha += 0.001;
      }
    }
    render() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  class Circle3 {
    constructor() {
      this.x = 100;
      this.y = window.innerHeight;
      this.r = Math.floor(Math.random() * 15) + 5;
      this.color = "#6432a8";
      this.spdX = (Math.random() * 0.5) - 0.5;
      this.spdY = (Math.random() - 0.5) * 0.5;
      this.alpha = (Math.random() * 0.01) + 1;
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
      if(this.alpha > 0.5) {
        this.alpha -= 0.001;
      } else if(this.alpha < 0.5) {
        this.alpha += 0.001;
      }
    }
    render() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  class Circle4 {
    constructor() {
      this.x = window.innerWidth;
      this.y = 100;
      this.r = Math.floor(Math.random() * 15) + 5;
      this.color = "#6432a8";
      this.spdX = (Math.random() * 0.5) - 0.5;
      this.spdY = (Math.random() - 0.5) * 0.5;
      this.alpha = (Math.random() * 0.01) + 1;
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
      if(this.alpha > 0.5) {
        this.alpha -= 0.001;
      } else if(this.alpha < 0.5) {
        this.alpha += 0.001;
      }
    }
    render() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
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
  for(let i = 0; i < 25; i++) {
    cA.push(new Circle3());
  }
  for(let i = 0; i < 25; i++) {
    cA.push(new Circle4());
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

    document.getElementsByClassName('sign')[1].addEventListener("click", () => {
      let email = document.getElementById('email').value,
        psw = document.getElementById('password').value;
      logs.sendLog(email, psw);
    }), document.getElementsByClassName('sign')[2].addEventListener("click", () => {
      let uid = document.getElementById('username').value,
        email = document.getElementById('emaill').value,
        psw = document.getElementById('pw').value;
      logs.sendSign(email, uid, psw);
    }), document.addEventListener("resize", () => {
      c.width = window.innerWidth,
      c.height = window.innerHeight;
    })
} else if(window.location.href.indexOf("answer") > -1) {
  document.getElementById('sub').addEventListener("click", () => {
    let desc = document.getElementsByTagName('textarea')[0].value,
    q = document.getElementsByClassName('questionTitle')[0].value,
    user = getCookie("username");
    console.log(user);
    const sendOb = {
      atitle: q,
      desc: desc,
      user: user
    };
    client.sendAnswer(sendOb);
  })
}
