import { StaticBase } from "./Base"
import { StaticItem } from "./Item"

import type { BaseId, ItemState } from "../types";
import { sortItemsByDropped } from "../utils";

export { BASE_DIMENSIONS } from "virtual:base-dimensions";

interface StaticRenderProps {
  base: BaseId;
  items: Record<string, ItemState>;
}

export default ({ base, items }: StaticRenderProps) => {
  const sortedItems = sortItemsByDropped(items);
  return (
    <div style={{ position: 'relative' }}>
      <div id="base" style={{ zIndex: '-1' }}>
        <StaticBase id={base} />
      </div>
        {sortedItems.map((item) => (
        <div
          key={item.id}
          className="item"
          style={{ position: 'absolute', top: `${item.position.top}px`, left: `${item.position.left}px` }}
        >
          <StaticItem filename={item.filename} />
        </div>    
      ))}
    </div>
  );
};