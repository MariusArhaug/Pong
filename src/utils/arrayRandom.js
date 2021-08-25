export function arrayRandom(length) {
  return Math.floor(Math.random() * length);
}

export function randomSpeed(array) {
  return array[arrayRandom(array.length)];
}
