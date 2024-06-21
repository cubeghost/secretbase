import React, { useCallback, useMemo, useState } from 'react';
import type { SingleValue } from 'react-select';
import clsx from 'clsx';

import StyledSelect from './Select';
import { DraggableItem } from './Item';
import { ITEMS as _ITEMS, CATEGORIES } from '../constants';
import { Category, Item } from '../types';
import jumpTo from '../assets/jump_to.png';

const ITEMS = _ITEMS as unknown as Item[];

const CATEGORY_OPTIONS = CATEGORIES.map(({ id, label }) => ({ value: id, label }));

interface CategoryOptionType {
  value: Category;
  label: string;
}

const ItemPicker = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [enableUnofficialItems, setUnofficialItems] = useState(false);

  const filteredItems = useMemo(() => {
    if (enableUnofficialItems) {
      return ITEMS;
    } else {
      return ITEMS.filter((item) => !item.unofficial);
    };
  }, [enableUnofficialItems]);

  const toggle = useCallback(() => {
    setExpanded(s => !s);
  }, []);

  const jump = useCallback((option: SingleValue<CategoryOptionType>) => {
    if (option) {
      const category = document.getElementById(`category-${option.value}`);
      category?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={clsx("item-picker", "with-border", { 'is-expanded': isExpanded })}>
      <div className="toolbar with-border-top-bar">
        <div className="category-jump">
          <label htmlFor="category-jump-select">
            <img 
              src={jumpTo} 
              height={12} 
              alt="Jump to category" 
              style={{ display: 'block' }} 
              className="util-pixelated"
            />
          </label>
          <StyledSelect<CategoryOptionType>
            options={CATEGORY_OPTIONS}
            onChange={jump}
            placeholder="Category..."
            id="category-jump-select"
          />
        </div>

        <label>
          <input
            type="checkbox"
            checked={enableUnofficialItems}
            onChange={(event) => setUnofficialItems(event.target.checked)}
          />
          Enable unofficial items
        </label>

        <button onClick={toggle} className="item-picker-toggle">{isExpanded ? 'Collapse' : 'Expand'}</button>
      </div>
      <div className="item-picker-scroll item-picker-grid">
        {CATEGORIES.map(({ id, label }) => (
          <React.Fragment key={id}>
            <h4 id={`category-${id}`}>{label}</h4>
            {filteredItems.filter(item => item.category === id).map((item) => (
              <DraggableItem
                key={item.filename}
                filename={item.filename}
                style={{ display: 'inline-block' }}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const MemoizedItemPicker = React.memo(ItemPicker);
export default MemoizedItemPicker;