import React, { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import type { SingleValue } from 'react-select';
import clsx from 'clsx';

import StyledSelect from './Select';
import DraggableItem from './DraggableItem';
import { ITEMS as _ITEMS, CATEGORIES } from '../constants';
import { Category, Item } from '../types';
import jumpTo from '../assets/jump_to.png';

const ITEMS = _ITEMS as unknown as Item[];

const CATEGORIES_WITH_ITEMS = CATEGORIES.map(category => ({
  ...category, 
  items: ITEMS.filter(item => item.category === category.id)
}));
const CATEGORIES_WITH_OFFICIAL_ITEMS = CATEGORIES.map(category => ({
  ...category,
  items: ITEMS.filter(item => item.unofficial !== true && item.category === category.id)
}));

const CATEGORY_OPTIONS = CATEGORIES.map(({ id, label }) => ({ value: id, label }));
const OFFICIAL_CATEGORY_OPTIONS = CATEGORIES_WITH_OFFICIAL_ITEMS
  .filter(({ items }) => items.length > 0)
  .map(({ id, label }) => ({ value: id, label }));

interface CategoryOptionType {
  value: Category;
  label: string;
}

interface ItemPickerProps {
  enableUnofficialItems: boolean;
  onChangeUnofficialItems: ChangeEventHandler<HTMLInputElement>;
}

const ItemPicker = ({ enableUnofficialItems, onChangeUnofficialItems }: ItemPickerProps) => {
  const [isExpanded, setExpanded] = useState(false);

  const categoryOptions = useMemo(() => 
    enableUnofficialItems ? CATEGORY_OPTIONS : OFFICIAL_CATEGORY_OPTIONS
  , [enableUnofficialItems]);

  const categoriesWithItems = useMemo(() => (
    (enableUnofficialItems ? CATEGORIES_WITH_ITEMS : CATEGORIES_WITH_OFFICIAL_ITEMS)
      .filter(({ items }) => items.length > 0)
  ), [enableUnofficialItems]);

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
    <div aria-role="region" aria-label="item picker" className={clsx("item-picker", "with-border", { 'is-expanded': isExpanded })}>
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
            options={categoryOptions}
            onChange={jump}
            placeholder="Category..."
            inputId="category-jump-select"
          />
        </div>

        <label>
          <input
            type="checkbox"
            checked={enableUnofficialItems}
            onChange={onChangeUnofficialItems}
          />
          Enable unofficial items
        </label>

        <button onClick={toggle} className="item-picker-toggle">{isExpanded ? 'Collapse' : 'Expand'}</button>
      </div>
      <div className="item-picker-scroll">
        <div className="item-picker-grid">
          {categoriesWithItems.map(({ id, label, items }) => (
            <React.Fragment key={id}>
              <h4 id={`category-${id}`}><span>{label}</span></h4>
              {items.map((item) => (
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
    </div>
  )
}

export default React.memo(ItemPicker);