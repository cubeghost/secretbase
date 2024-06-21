import React, { useState, useCallback } from "react";
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import clsx from "clsx";
import { nanoid } from 'nanoid';
// @ts-expect-error
import download from 'downloadjs';

import Music from "./Music"
import { BaseId, ItemState } from "../types";

interface OptionsProps {
  enableSnapToGrid: boolean;
  getSaveData: () => {
    base: BaseId;
    items: Record<string, ItemState>;
  };
  onClear: MouseEventHandler<HTMLButtonElement>;
  onChangeSnapToGrid: ChangeEventHandler<HTMLInputElement>;
}

const Options = ({
  enableSnapToGrid,
  getSaveData,
  onClear,
  onChangeSnapToGrid,
}: OptionsProps) => {
  const [isSaving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>();

  const onSave = useCallback(async () => {
    setSaving(true);
    try {
      const { base, items } = getSaveData();

      const response = await fetch('/.netlify/functions/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          base,
          items
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw Error(message);
      }

      const blob = await response.blob();
      download(blob, `secretbase_${nanoid(8)}.png`);
      setSaving(false);
      setSaveError(null);
    } catch (error) {
      console.error(error);
      setSaving(false);
      setSaveError(error as Error);
    }
  }, [getSaveData]);

  return (
    <div className="options with-border">
      <div>
        <h3>Options</h3>
        <label style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={enableSnapToGrid}
            onChange={onChangeSnapToGrid}
          />
          Snap to grid
        </label>
        <Music />
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <button onClick={onClear} className="icon-button icon-button--clear">
          <span>Clear</span>
        </button>
        <button className="icon-button icon-button--share">
          <span>Share</span>
        </button>
        <button
          onClick={onSave}
          className={clsx('icon-button', 'icon-button--save', {
            'icon-button--active': isSaving,
            'icon-button--error': !!saveError
          })}
        >
          <span>Save</span>
        </button>
      </div>
    </div>
  )
}

export default React.memo(Options);