/**
* @author Ameer Hamoodi <ahamoodi178@gmail.com
* @description A class that for drawing diagrams designed by the very sleep deprived Ameer Hamoodi
*/

class Drawer {
  constructor(ctx, c) {
    this.ctx = ctx;
    this.c = c;
    this.dragging = false;
    this.mx = 0;
    this.my = 0;
    this.circleRad = 10;
    this.tl = false;
    this.tr = false;
    this.bl = false;
    this.br = false;
    this.rect = {x: 100, y: 200, w: 300, h: 200}
  }
  init() {
    this.c.addEventListener("mousedown", this.press);
    this.c.addEventListener("mouseup", this.not);
    this.c.addEventListener("mousemove", this.move);
  }
  press(event) {
    this.mx = event.clientX;
    this.my = event.clientY;

    if(this.rect.w === undefined) {
          rect.x = this.mx;
          rect.y = this.mx;
          this.br = true;
      }
      else if(this.checkRad(this.mx, this.rect.x) && checkRad(this.my, this.rect.y)) {
              this.tl = true;
        } else if (checkRad(this.mx, this.rect.x + rect.w) && checkRad(this.my, this.rect.y)) {
            this.tr = true;
        } else if (checkRad(this.mx, this.rect.x) && checkRad(this.my, this.rect.y + this.rect.h)) {
            this.bl = true;
        } else if (checkRad(this.mx, this.rect.x + this.rect.w) && checkRad(this.my, rect.y + this.rect.h)) {
            this.br = true;
        }
     this.ctx.clearRect(0, 0, this.c.width, this.c.height);
  }
  checkRad(point0, point1) {
    return Math.abs(point0 - point1) < this.circleRad;
  }
}
