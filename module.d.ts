import { BaseId } from "./src/types";

declare module 'virtual:base-dimensions' {
  export const BASE_DIMENSIONS: Record<BaseId, [number, number]>;
}
