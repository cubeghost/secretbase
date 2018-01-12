import React from 'react';

import Item from 'components/Item';

import { items } from 'src/constants';

import styles from './styles.scss';

const ItemPicker = () => (
  <div className={styles.picker}>
    {items.map(item => (
      <Item key={item} type={item} />
    ))}
  </div>
);

export default ItemPicker;
