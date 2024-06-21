/// <reference types="vite/client" />

declare module 'virtual:base-dimensions' {
  import { BaseId } from "./types";
  export const BASE_DIMENSIONS: Record<BaseId, [number, number]>;
}
