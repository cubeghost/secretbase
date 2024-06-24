import React, { useMemo } from "react";
import { BASE_MAP, BASE_TYPES } from "../constants";
import { SaveData } from "../types"
import { StaticItem } from "./Item";
import { coordinatesTupleToGridStyle } from "../utils";

type DefaultItemsProps = Pick<SaveData, 'base' | 'enableDefaultLaptop' | 'enableDefaultLandscape'>;

const DefaultItems = ({ base, enableDefaultLaptop, enableDefaultLandscape }: DefaultItemsProps) => {
  const { landscapeItem, defaultItemLocations } = useMemo(() => {
    const meta = BASE_MAP.get(base)!;
    return {
      defaultItemLocations: meta.locations,
      landscapeItem: BASE_TYPES[meta.type].landscape_item,
    };
  }, [base]);

  const items: React.ReactNode[] = [];

  if (enableDefaultLaptop && defaultItemLocations.laptop) {
    items.push(
      <div
        className="item--default item--default-laptop"
        style={coordinatesTupleToGridStyle(defaultItemLocations.laptop)}
      >
        <StaticItem filename="laptop.png" />
      </div>
    );
  }
  
  if (enableDefaultLandscape && defaultItemLocations.gap.length > 0) {
    items.push(...defaultItemLocations.gap.map((coordinates, index) => (
      <div
        key={`gap-${index}`}
        className="item--default item--default-hole"
        style={coordinatesTupleToGridStyle(coordinates)}
      >
        <StaticItem filename="hole.png" />
      </div>
    )));
  }

  if (enableDefaultLandscape && defaultItemLocations.landscape.length > 0) {
    items.push(...defaultItemLocations.landscape.map((coordinates, index) => (
      <div
        key={`landscape-${index}`}
        className="item--default item--default-landscape"
        style={coordinatesTupleToGridStyle(coordinates)}
      >
        <StaticItem filename={landscapeItem} />
      </div>
    )));
  }

  return items;
};

export default React.memo(DefaultItems);