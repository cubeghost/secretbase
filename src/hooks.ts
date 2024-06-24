import { useMemo } from "react";

import { BASE_DIMENSIONS } from "virtual:base-dimensions";
import { GRID_SIZE, POOF_DURATION } from "./constants";
import { BaseId } from "./types";

export const useCssVariables = () => useMemo(() => {
  return {
    '--grid-size': `${GRID_SIZE}px`,
    '--poof-duration': `${POOF_DURATION}ms`,
  } as React.CSSProperties;
}, []);

export const useBaseCssVariables = (base: BaseId) => useMemo(() => {
  const [width, height] = BASE_DIMENSIONS[base];
  return {
    '--base-tile-width': width / GRID_SIZE,
    '--base-tile-height': height / GRID_SIZE,
  } as React.CSSProperties;
}, [base]);
