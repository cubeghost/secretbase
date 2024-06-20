import { StaticBase } from "./Base"
import { StaticItem } from "./Item"

import type { BaseId, ItemState } from "../types";

// @ts-expect-error
export { BASE_DIMENSIONS } from "virtual:base-dimensions";

interface StaticRenderProps {
  base: BaseId;
  items: ItemState[];
}

export default ({ base, items }: StaticRenderProps) => (
  <div style={{ position: 'relative' }}>
    <div id="base" style={{ zIndex: '-1' }}>
      <StaticBase id={base} />
    </div>
    {items.map((item) => (
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