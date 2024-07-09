import React, { useCallback, useState } from "react";
import type { ChangeEventHandler } from "react";
import clsx from "clsx";

import { BaseId } from "../types";
import BasePicker, { BasePickerProps } from "./BasePicker";

import labelBase from '../assets/label_base.png';

interface BaseOptionsProps {
  base: BaseId;
  enableSnapToGrid: boolean;
  enableDefaultLaptop: boolean;
  enableDefaultLandscape: boolean;
  onChangeBase: BasePickerProps['onChange'];
  onChangeSnapToGrid: ChangeEventHandler<HTMLInputElement>;
  onChangeDefaultLaptop: ChangeEventHandler<HTMLInputElement>;
  onChangeDefaultLandscape: ChangeEventHandler<HTMLInputElement>;
  isMobileLayout: boolean;
}

// TODO maybe just make a generic expanding container
const BaseOptions = ({ base, enableSnapToGrid, enableDefaultLaptop, enableDefaultLandscape, onChangeBase, onChangeSnapToGrid, onChangeDefaultLaptop, onChangeDefaultLandscape, isMobileLayout }: BaseOptionsProps) => {
  const [isExpanded, setExpanded] = useState(false);
  
  const toggle = useCallback(() => {
    setExpanded(s => !s);
  }, []);

  return (
    <div role="region" aria-label="options" className={clsx("controls", "base-options", "with-border", { 'is-expanded': isExpanded })}>
      <div className="with-border-top-bar">
        <h3>
          <img src={labelBase} height={12} alt="Base" className="util-block util-pixelated" />
        </h3>
        <div className="base-picker">
          <BasePicker value={base} onChange={onChangeBase} />
        </div>
        {isMobileLayout && (
          <button onClick={toggle}>{isExpanded ? 'Collapse' : 'Expand'}</button>
        )}
      </div>
      {(isExpanded || !isMobileLayout) && (
        <>
          <label className="util-block">
            <input
              type="checkbox"
              checked={enableSnapToGrid}
              onChange={onChangeSnapToGrid}
            />
            Snap to grid
          </label>
          <label className="util-block">
            <input
              type="checkbox"
              checked={enableDefaultLaptop}
              onChange={onChangeDefaultLaptop}
            />
            Default laptop
          </label>
          <label className="util-block">
            <input
              type="checkbox"
              checked={enableDefaultLandscape}
              onChange={onChangeDefaultLandscape}
            />
            Default landscape items
          </label>
        </>
      )}
    </div>
  );
}

export default React.memo(BaseOptions);