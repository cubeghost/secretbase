import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

const Options = ({
  enableUnofficialItems,
  toggleUnofficialItems,
  enableStrictGrid,
  toggleStrictGrid,
  clearItems,
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
      <button onClick={clearItems}>Clear</button>
    </div>
  </div>
);

export default Options;
