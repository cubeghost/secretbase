/// <reference types="vite/client" />

declare module 'virtual:base-dimensions' {
  import { BaseId } from "./types";
  let BASE_DIMENSIONS: Record<BaseId, [number, number]>;
  export default { BASE_DIMENSIONS };
}
