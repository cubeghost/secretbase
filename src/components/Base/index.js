import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Item, { ItemType } from 'components/Item';

import { snapToGrid } from 'src/utils';

import styles from './styles.scss';

const dropTarget = {
  canDrop: (props, monitor) => {
    return monitor.isOver();
  },
  drop: (props, monitor, component) => {
    const baseOffset = component.ref.getBoundingClientRect();
    const clientOffset = monitor.getSourceClientOffset();
    const item = monitor.getItem();

    const x = snapToGrid(Math.round(Math.abs(baseOffset.x - clientOffset.x)));
    const y = snapToGrid(Math.round(Math.abs(baseOffset.y - clientOffset.y)));

    props.handleDrop(item, x, y);
  },
};

const collect = connect => ({
  connectDropTarget: connect.dropTarget(),
});

class Base extends Component {
  render() {
    const { base, items, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={styles.base} ref={(ref) => { this.ref = ref; }}>
        <img className={styles.image} src={`/assets/bases/${base}.png`} />
        <div className={styles.items}>
          {Object.keys(items).map(key => (
            <Item
              key={key}
              {...items[key]}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default DropTarget(
  ItemType,
  dropTarget,
  collect,
)(Base);
