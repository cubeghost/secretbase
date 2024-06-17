import React from 'react';
import classNames from 'classnames';

import Item from '../Item';

import { categories } from '../../constants';

import styles from './styles.scss';

const ItemPicker = ({ itemProps, enableUnofficialItems }) => (
  <div className={classNames(styles.picker, 'border')}>
    <div className={styles.scrollContainer}>

      {categories.map(category => {
        return (
          <div key={category.id} className={styles.category}>
            <h4>{category.label}</h4>
            <div className={styles.categoryItems}>

              {category.items.map(item => {
                if (!enableUnofficialItems && item.unofficial) {
                  return null;
                }
                return (
                  <Item
                    key={item.filename}
                    type={item.filename}
                    className={styles.item}
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
