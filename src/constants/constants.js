const EASY = {
  speed: [5, 5, -5, -5],
  y: 200,
  height: 245,
  radius: 27.5,
};

const NORMAL = {
  speed: [7.5, 7.5, -7.5, -7.5],
  y: 175,
  height: 215,
  radius: 22.5,
};

const HARD = {
  speed: [10, 10, -10, -10],
  y: 150,
  height: 185,
  radius: 17.5,
};

export const DIFFICULTY = new Map([
  ["easy", EASY],
  ["normal", NORMAL],
  ["hard", HARD],
]);

export const COLOR = "#fce094";
export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight - 40;
export const CENTER_X = WINDOW_WIDTH / 2;
export const CENTER_Y = WINDOW_HEIGHT / 2;

export const DATA = {
  PLAYER_ONE: {
    x: 80,
  },
  PLAYER_TWO: {
    x: WINDOW_WIDTH - 80,
  },
  width: 7.5,
};
