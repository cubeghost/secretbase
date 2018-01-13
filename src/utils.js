import { GRID_SPACING } from 'src/constants';

export function snapToGrid(d) {
  return Math.round(d / GRID_SPACING) * GRID_SPACING;
}

export function randomId() {
  return Math.random().toString(36).substr(2, 9);
}
