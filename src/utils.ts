import { customAlphabet } from "nanoid";

import { ItemState } from "./types";

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12);

export const sortItemsByDropped = (items: Record<string, ItemState>) => 
  Object.values(items).sort((a, b) => a.dropped - b.dropped);

export const coordinatesTupleToGridStyle = ([left, top]: [number, number]) => ({ gridColumnStart: left + 1, gridRowStart: top + 1 });