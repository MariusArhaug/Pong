import { WINDOW_HEIGHT, DATA } from "../constants/constants.js";
import { Model } from "./Model.js";

export class Player extends Model {
  constructor(ctx, x, y, dy, width, height, color, name) {
    super(ctx, x, y, 0, dy, color);
    this.width = width;
    this.height = height;
    this.points = 0;
    this.name = name;
  }

  getName() {
    return this.name;
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

  speedUp(direction) {
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

  hasPushed() {
    return this.getDX() < 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    this.ctx.strokeStyle = this.getColor();
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
    if (this.x > DATA.PLAYER_ONE.x + 27.5) {
      this.dx = -this.dx;
    }

    if (this.x > DATA.PLAYER_TWO.x - 27.5) {
      this.dx = -this.dx;
    }

    if (this.x < DATA.PLAYER_ONE.x) {
      this.pushBack(DATA.PLAYER_ONE.x);
    }
    if (this.x > DATA.PLAYER_TWO.x) {
      this.pushBack(DATA.PLAYER_TWO.x);
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
  }
}
