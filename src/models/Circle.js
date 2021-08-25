import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  CENTER_X,
  CENTER_Y,
} from "../constants/constants.js";
import { randomSpeed } from "../utils/arrayRandom.js";
import { Model } from "./Model.js";

export class Circle extends Model {
  constructor(ctx, x, y, dx, dy, color, setting) {
    super(ctx, x, y, dx, dy, color);
    this.setting = setting;
  }

  getRadius() {
    return this.setting.radius;
  }

  getSpeed() {
    return this.setting.speed;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, 2 * Math.PI);
    this.ctx.strokeStyle = this.getColor();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  isCrashingTopOrBottom() {
    return (
      this.y + this.getDY() > WINDOW_HEIGHT - this.getRadius() ||
      this.y + this.getDY() < this.getRadius()
    );
  }

  update(playerOne, playerTwo) {
    if (this.isCrashingTopOrBottom()) {
      this.dy = -this.dy;
    }

    if (this.hasCollided(playerOne) || this.hasCollided(playerTwo)) {
      if (playerOne.hasPushed()) {
        this.dx -= 3;
      } else if (playerTwo.hasPushed()) {
        this.dx += 3;
      } else {
        this.dy = -this.dy;
      }

      this.dx = -this.dx;
    }

    if (this.dx > Math.abs(randomSpeed(this.getSpeed()))) {
      this.dx = this.dx * 0.75;
    }
    if (this.dx < Math.abs(randomSpeed(this.getSpeed())) * -1) {
      this.dx = this.dx * 0.75;
    }

    this.x += this.getDX();
    this.y += this.getDY();
    this.draw();
  }

  center() {
    this.x = CENTER_X;
    this.y = CENTER_Y;
    this.dx = randomSpeed(this.getSpeed());
    this.dy = randomSpeed(this.getSpeed());
  }

  hasCollided(player) {
    const PLAYER_WIDTH = player.getWidth() / 2;
    const distX = Math.abs(
      this.getX() + this.getDX() - player.getX() - PLAYER_WIDTH - player.getDY()
    );
    const distY = Math.abs(
      this.getY() + this.getDY() - player.getY() - PLAYER_WIDTH - player.getDY()
    );

    if (distX > player.getWidth() / 2 + this.getRadius()) {
      return false;
    }
    if (distY > player.getHeight() / 2 + this.getRadius()) {
      return false;
    }

    if (distX <= player.getWidth() / 2) {
      return true;
    }
    if (distY <= player.getHeight() / 2) {
      return true;
    }

    const dx = distX - PLAYER_WIDTH;
    const dy = distY - PLAYER_WIDTH;
    return dx * dx + dy * dy <= this.getRadius() * this.getRadius();
  }
}
