import {
  DIFFICULTY,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "./constants/constants.js";
import { Game } from "./models/index.js";

window.startGame = startGame;
window.showInstructions = showInstructions;
window.reset = reset;

const CANVAS = $("#canvas")[0];
CANVAS.width = WINDOW_WIDTH;
CANVAS.height = WINDOW_HEIGHT;
let GAME = undefined;

function startGame(key) {
  GAME = new Game(CANVAS.getContext("2d"), DIFFICULTY.get(key));
  $(".menu-container").first().css("display", "none");
  $(".sidebars").first().css("display", "none");
  $(".sidebars").last().css("display", "none");
  $("h1").first().css("visibility", "visible");
  GAME.startGame();
  window.addEventListener(
    "keydown",
    (event) => {
      GAME.movePlayer(event);
    },
    false
  );
}

export function stopGame(player) {
  $(".menu-container").first().css("display", "block");
  $("menu").first().css("display", "none");

  $(".winner-container").first().css("display", "block");
  $(".winner-message").first().html(`Player ${player.getName()} wins!`);
}

function reset() {
  $("menu").css("display", "block");
  $(".winner-container").first().css("display", "none");
  $("pOne-Counter").html("0");
  $("pTwo-Counter").html("0");
  $(".sidebars").first().css("display", "block");
  $(".sidebars").last().css("display", "block");
  GAME.reset();
}

function showInstructions() {
  $("menu").css("display", "none");
  $("instructions-container").css("display", "flex");
}
