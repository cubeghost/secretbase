import { StaticBase } from "./Base"
import { StaticItem } from "./Item"
import DefaultItems from "./DefaultItems";

import type { SaveData } from "../types";
import { sortItemsByDropped } from "../utils";
import { useBaseCssVariables, useCssVariables } from "../hooks";

export { BASE_DIMENSIONS } from "virtual:base-dimensions";

type StaticRenderProps = Pick<SaveData, 'base' | 'items' | 'enableDefaultLaptop' | 'enableDefaultLandscape'>;

export default ({ base, items, enableDefaultLaptop, enableDefaultLandscape }: StaticRenderProps) => {
  const cssVariables = useCssVariables();
  const baseCssVariables = useBaseCssVariables(base);

  const sortedItems = sortItemsByDropped(items);

  return (
    <div className="base base-static" style={{...cssVariables, ...baseCssVariables}}>
      <div id="base" className="base-droppable">
        <StaticBase id={base} />
      </div>
      <DefaultItems
        base={base}
        enableDefaultLaptop={enableDefaultLaptop}
        enableDefaultLandscape={enableDefaultLandscape}
      />
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