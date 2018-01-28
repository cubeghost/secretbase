import React from 'react';
import classNames from 'classnames';

import Audio from 'components/Audio';

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
  <div className={classNames(styles.container, 'border')}>

    <div className={styles.options}>
      <h3>Options</h3>

      <div className={styles.field}>
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

      <div className={styles.field}>
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

      {/* TEMP */}
      {/* <button onClick={tempSaveState}>test base64 save state</button> */}

      <Audio />
    </div>

    <div className={styles.controls}>
      <button
        className={classNames(
          styles.iconButton,
          styles.clearButton,
        )}
        onClick={clearItems}
      >
        <span>Clear</span>
      </button>

      <button
        className={classNames(
          styles.iconButton,
          styles.shareButton,
        )}
        onClick={tempSaveState}
      >
        <span>Share</span>
      </button>

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
