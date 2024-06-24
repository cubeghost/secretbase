import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { nanoid } from 'nanoid';
// @ts-expect-error
import download from 'downloadjs';

import { SaveData } from "../types";

interface SaveProps {
  getSaveData: () => SaveData;
}

const Save = ({ getSaveData }: SaveProps) => {
  const [isSaving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>();

  const onSave = useCallback(async () => {
    setSaving(true);
    try {
      const response = await fetch('/.netlify/functions/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getSaveData()),
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
    <button
      onClick={onSave}
      className={clsx('icon-button', 'icon-button--save', {
        'icon-button--active': isSaving,
        'icon-button--error': !!saveError
      })}
    >
      <span>Save</span>
    </button>
  );
}

export default React.memo(Save);