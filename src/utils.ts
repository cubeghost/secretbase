import { ItemState } from "./types";

export const sortItemsByDropped = (items: Record<string, ItemState>) => 
  Object.values(items).sort((a, b) => a.dropped - b.dropped);