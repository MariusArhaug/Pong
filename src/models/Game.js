import { Circle } from "./Circle.js";
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  CENTER_X,
  CENTER_Y,
  COLOR,
  DATA,
} from "../constants/constants.js";
import { Player } from "./Player.js";
import { stopGame } from "../main.js";
import { randomSpeed } from "../utils/index.js";

export class Game {
  constructor(ctx, setting) {
    this.ctx = ctx;
    this.requestId = undefined;
    this.lastKeyCode = undefined;
    this.setting = setting;
    this.init();
  }

  init() {
    const SPEED_X = randomSpeed(this.setting.speed);
    const SPEED_Y = randomSpeed(this.setting.speed);
    this.circle = new Circle(
      this.ctx,
      CENTER_X,
      CENTER_Y,
      SPEED_X,
      SPEED_Y,
      COLOR,
      this.setting
    );
    this.playerOne = new Player(
      this.ctx,
      DATA.PLAYER_ONE.x,
      this.setting.y,
      0,
      DATA.width,
      this.setting.height,
      COLOR,
      "One"
    );
    this.playerTwo = new Player(
      this.ctx,
      DATA.PLAYER_TWO.x,
      this.setting.y,
      0,
      DATA.width,
      this.setting.height,
      COLOR,
      "Two"
    );
  }

  updateAll() {
    this.circle.update(this.playerOne, this.playerTwo);
    this.playerTwo.update();
    this.playerOne.update();
    this.updateScore();
    if (this.hasWon()) {
      if (this.playerOne.getPoints() === 10) {
        stopGame(this.playerOne);
      } else {
        stopGame(this.playerTwo);
      }
      this.stopAnimation();
    }
  }

  hasWon() {
    return (
      this.playerOne.getPoints() === 10 || this.playerTwo.getPoints() === 10
    );
  }

  //playerOnehasScored()
  playerHasScored() {
    if (this.circle.getX() - this.circle.getRadius() * 3 > WINDOW_WIDTH) {
      //If ball passes the right wall and goes past it
      this.playerOne.increasePoints();
      this.circle.center();
      return true;
    }
    if (this.circle.getX() + this.circle.getRadius() * 3 < 0) {
      //If ball passes with left wall and goes past it
      this.playerTwo.increasePoints();
      this.circle.center();
      return true;
    }
    return false;
  }

  updateScore() {
    if (this.playerHasScored()) {
      document.getElementById("pOne-Counter").innerHTML =
        this.playerOne.points.toString();
      document.getElementById("pTwo-Counter").innerHTML =
        this.playerTwo.points.toString();
    }
  }

  startGame() {
    this.animate();
  }

  animate() {
    this.requestId = undefined;
    this.startAnimation();
    this.ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    this.updateAll();
  }

  startAnimation() {
    if (!this.requestId) {
      this.requestId = window.requestAnimationFrame(() => {
        this.animate();
      });
    }
  }

  stopAnimation() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }

  movePlayer(event) {
    event.preventDefault();
    switch (event.key) {
      case "w":
        this.playerOne.move(-1);
        if (this.lastKeyCode === event.key) {
          this.playerOne.speedUp(-1);
        }
        break;
      case "s":
        this.playerOne.move(1);
        if (this.lastKeyCode === event.key) {
          this.playerOne.speedUp(1);
        }
        break;
      case "d":
        this.playerOne.pushForward(1);
        break;

      case "ArrowUp":
        this.playerTwo.move(-1);
        if (this.lastKeyCode === event.key) {
          this.playerTwo.speedUp(-1);
        }
        break;
      case "ArrowDown":
        this.playerTwo.move(1);
        if (this.lastKeyCode === event.key) {
          this.playerTwo.speedUp(1);
        }
        break;
      case "ArrowLeft":
        this.playerTwo.pushForward(-1);
        break;
    }
    this.lastKeyCode = event.key;
  }

  reset() {
    this.ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    this.playerOne.reset();
    this.playerTwo.reset();
    this.circle.reset();
  }
}
