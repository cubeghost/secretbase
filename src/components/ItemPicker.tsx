import React, { useCallback, useState } from 'react';
import type { SingleValue } from 'react-select';
import clsx from 'clsx';

import StyledSelect from './Select';
import { DraggableItem } from './Item';
import { ITEMS, CATEGORIES } from '../constants';
import { Category } from '../types';

const CATEGORY_OPTIONS = CATEGORIES.map(({ id, label }) => ({ value: id, label }));

interface CategoryOptionType {
  value: Category;
  label: string;
}

const ItemPicker = () => {
  const [isExpanded, setExpanded] = useState(false);

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
    <div className={clsx("item-picker", { 'is-expanded': isExpanded })}>
      <div className="toolbar">
        <span>Jump to: </span>
        <StyledSelect<CategoryOptionType>
          options={CATEGORY_OPTIONS}
          onChange={jump}
        />
        <button onClick={toggle} className="item-picker-toggle">{isExpanded ? 'Collapse' : 'Expand'}</button>
      </div>
      <div className="item-picker-scroll item-picker-grid">
        {CATEGORIES.map(({ id, label }) => (
          <React.Fragment key={id}>
            <h4 id={`category-${id}`}>{label}</h4>
            {ITEMS.filter(item => item.category === id).map((item) => (
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