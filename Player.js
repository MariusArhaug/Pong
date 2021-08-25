import { WINDOW_HEIGHT, DATA } from "./constants.js";

export default class Player {
  constructor(ctx, x, y, dx, dy, width, height, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  getDX() {
    return this.dx;
  }

  getDY() {
    return this.dy;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getPoints() {
    return this.points;
  }

  move(direction) {
    // direction is a value between 1 and -1, if positive move down, if negative move down
    this.dy = 3.5 * direction;
  }

  speedUp() {
    this.dy += 3.5 * direction;
  }

  pushForward(direction) {
    //direction is a value between 1 and -1, if positive move right if negative move left
    this.dx = 5 * direction;
  }
  pushBack(x) {
    this.x = x;
    this.dx = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    if (
      this.y + this.getHeight() + this.getDY() >= WINDOW_HEIGHT ||
      this.y + this.getDY() <= 0
    ) {
      this.dy = -this.dy;
    }

    //if x cordinates is more than 27.5 from start position reverse speed
    if (this.x > DATA.One.x + 27.5) {
      this.dx = -this.dx;
    }

    if (this.x > DATA.Two.x - 27.5) {
      this.dx = -this.dx;
    }

    if (this.x < DATA.One.x) {
      this.pushBack(DATA.One.x);
    }
    if (this.x > DATA.Two.x) {
      this.pushBack(DATA.Two.x);
    }

    if (Math.abs(this.getDY()) > 3.5) {
      this.dy = this.dy * 0.985;
    }

    this.y += this.dy;

    if (this.getDX() !== 0) {
      this.x += this.dx;
    }

    this.draw();
  }

  center() {
    this.dy = 0;
    this.y = 150;
  }

  increasePoints() {
    this.points++;
    //if (this..points >= 10) {
    //  stopGame();
    //}
  }
}
