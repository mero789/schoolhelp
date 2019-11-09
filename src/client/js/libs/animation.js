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
class Circle {
  constructor() {
    this.x = Math.floor((Math.random() * window.innerWidth) + 0);
    this.y = Math.floor((Math.random - window.innerHeight) + window.innerHeight / 2);
    this.r = Math.floor(Math.random() * 25) + 5;
    this.color = "#6432a8";
    this.spdX = Math.floor(Math.random() * 2) - 2;
    this.spdY = Math.floor(Math.random() - 2) * 2;
  }
  update() {
    this.x += this.spdX;
    this.y += this.spdY;
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
for(let i = 0; i < 50; i++) {
  cA.push(new Circle());
}
let dt, now, last;

c.width = window.innerWidth;
c.height = window.innerHeight;

now = Date.now();

export function up() {
    cA.forEach(function(element) {
      element.update();
    });
    last = Date.now();
    dt = last - now;
    now = last;
    console.log("update");
  }


export function anim() {
    window.requestAnimationFrame(anim);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    cA.forEach(function(element) {
      element.render();
    });
  }
