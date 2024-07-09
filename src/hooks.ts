import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

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

const MIN_PICKER_WIDTH = 280;
export const useMobileQuery = (base: BaseId) => {
  const query = useMemo(() => {
    const [width] = BASE_DIMENSIONS[base];
    // margin + picker + gutter + base + margin
    const minWidth = GRID_SIZE + MIN_PICKER_WIDTH + GRID_SIZE + width + GRID_SIZE;
    return `(max-width: ${minWidth}px)`;
  }, [base]);

  const isMobile = useMediaQuery({ query });

  return isMobile;
}