import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/constants.js";

export class Model {
  constructor(ctx, x, y, dx, dy, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  reset() {
    this.ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  }

  getCTX() {
    return this.ctx;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getDX() {
    return this.dx;
  }

  getDY() {
    return this.dy;
  }

  getColor() {
    return this.color;
  }
}
