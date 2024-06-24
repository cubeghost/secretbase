import { BaseId, ItemFilename, MinimalSaveData, SAVE_DATA_BOOLEAN_KEYS, SaveData, SaveDataBooleanKey } from "./types";
import { compress, decompress } from "./compress";
import { nanoid, sortItemsByDropped } from "./utils";

// note: `buffer` arg can be an ArrayBuffer or a Uint8Array
async function bufferToBase64(buffer: ArrayBuffer | Uint8Array) {
  // use a FileReader to generate a base64 data URI:
  const base64url: string = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(new File([buffer], "", { type: "application/octet-stream" }));
  });
  // remove the `data:...;base64,` part from the start
  return base64url.slice(base64url.indexOf(',') + 1);
}

async function base64ToBuffer(base64: string) {
  const res = await fetch(`data:application/octet-stream;base64,${base64}`);
  return new Uint8Array(await res.arrayBuffer());
}

export const minimizeSaveData = (saveData: SaveData): MinimalSaveData => {
  const sortedItems = sortItemsByDropped(saveData.items);
  const tinyItems = sortedItems.map((item) => (
    [item.filename, [item.position.left, item.position.top]] as [ItemFilename, [number, number]]
  ));

  return {
    ...saveData,
    base: saveData.base.replace('base_', '') as MinimalSaveData['base'],
    items: tinyItems
  };
};

export const maximizeSaveData = (saveData: MinimalSaveData): SaveData => {
  const now = Date.now();
  const itemsWithState = Object.fromEntries(saveData.items.map(([filename, position], index) => {
    const id = nanoid();
    const [left, top] = position;
    return [id, {
      id,
      filename,
      position: { top, left },
      dropped: now + index
    }];
  }));

  return {
    ...saveData,
    base: `base_${saveData.base}` as BaseId,
    items: itemsWithState
  }
};

const SAVE_DATA_ALLOWED_KEYS = ['base', 'items', ...SAVE_DATA_BOOLEAN_KEYS];

export const encodeSaveData = async (minimalSaveData: MinimalSaveData) => {
  const entries = await Promise.all(Object.entries(minimalSaveData).map(async ([key, value]) => {
    if (key === 'items' && value.length > 0) {
      const compressed = await compress(JSON.stringify(value));
      const base64 = await bufferToBase64(compressed);
      return [key, base64];
    } else if (SAVE_DATA_BOOLEAN_KEYS.includes(key as SaveDataBooleanKey)) {
      return [key, JSON.stringify(value)];
    }

    return [key, value];
  }));

  return new URLSearchParams(Object.fromEntries(entries)).toString();
};

export const decodeSaveData = async (encodedSaveData: string) => {
  const filteredEntries = [...new URLSearchParams(encodedSaveData).entries()].filter(([key]) =>
    SAVE_DATA_ALLOWED_KEYS.includes(key)
  );
  const decodedEntries = await Promise.all(filteredEntries.map(async ([key, value]) => {
    if (key === 'items') {
      if (value?.length > 0) {
        const compressed = await base64ToBuffer(value);
        const decompressed = await decompress(compressed);
        return [key, JSON.parse(decompressed)];
      } else {
        return [key, []];
      }
    } else if (SAVE_DATA_BOOLEAN_KEYS.includes(key as SaveDataBooleanKey)) {
      return [key, value === 'true' ? true : false];
    }

    return [key, value];
  }));

  return Object.fromEntries(decodedEntries);
}