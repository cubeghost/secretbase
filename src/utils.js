export function snapToGrid(d) {
  return Math.round(d / 8) * 8;
}

export function randomId() {
  return Math.random().toString(36).substr(2, 9);
}
