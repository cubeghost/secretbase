import React from 'react';
import classNames from 'classnames';

import Item from 'components/Item';

import { categories } from 'src/constants';

import styles from './styles.scss';

const ItemPicker = ({ itemProps, enableUnofficialItems }) => (
  <div className={classNames(styles.picker, 'border')}>
    <div className={styles.scrollContainer}>

      {categories.map(category => {
        return (
          <div key={category.id} className={styles.category}>
            <p>{category.label}</p>
            <div>

              {category.items.map(item => {
                if (!enableUnofficialItems && item.unofficial) {
                  return null;
                }
                return (
                  <Item
                    key={item.filename}
                    type={item.filename}
                    {...itemProps}
                  />
                );
              })}

            </div>
          </div>
        );
      })}

    </div>
  </div>
);

export default ItemPicker;
