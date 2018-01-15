import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

const Options = ({
  enableUnofficialItems,
  toggleUnofficialItems,
  enableStrictGrid,
  toggleStrictGrid,
  clearItems,
  save,
  isSaving,
  // TEMP
  tempSaveState,
}) => (
  <div className={classNames(styles.options, 'border')}>

    <div>
      <input
        type="checkbox"
        checked={enableUnofficialItems}
        onChange={toggleUnofficialItems}
        id="enableUnofficialItems"
      />
      <label htmlFor="enableUnofficialItems">
        Enable unofficial items
      </label>
    </div>

    <div>
      <input
        type="checkbox"
        checked={enableStrictGrid}
        onChange={toggleStrictGrid}
        id="enableStrictGrid"
      />
      <label htmlFor="enableStrictGrid">
        Snap to grid
      </label>
    </div>

    <div>
      {/* TEMP */}
      <button onClick={tempSaveState}>test</button>
    </div>

    <div>
      <button
        className={classNames(
          styles.iconButton,
          styles.clearButton,
        )}
        onClick={clearItems}
      >
        <span>Clear</span>
      </button>
    </div>

    <div>
      <button
        className={classNames(
          styles.iconButton,
          styles.saveButton,
          isSaving ? styles.saveButtonActive : null
        )}
        onClick={save}
      >
        <span>Save</span>
      </button>
    </div>

  </div>
);

export default Options;
