import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Item, { ItemType } from 'components/Item';

import { snapToGrid } from 'src/utils';

import styles from './styles.scss';

const dropTarget = {
  canDrop: (props, monitor) => monitor.isOver(),
  drop: (props, monitor, component) => {
    const item = monitor.getItem();
    const baseOffset = component.ref.getBoundingClientRect();
    const clientOffset = monitor.getSourceClientOffset();

    const x = snapToGrid(Math.round(Math.abs(baseOffset.x - clientOffset.x)));
    const y = snapToGrid(Math.round(Math.abs(baseOffset.y - clientOffset.y)));

    return props.handleDrop(item, x, y);
  },
};

const collect = connect => ({
  connectDropTarget: connect.dropTarget(),
});

class Base extends Component {
  render() {
    const { base, items, connectDropTarget, itemProps } = this.props;

    return connectDropTarget(
      <div className={styles.base} ref={(ref) => { this.ref = ref; }}>
        <img className={styles.image} src={`/assets/bases/${base}.png`} />
        <div className={styles.items}>
          {Object.keys(items).map(key => (
            <Item
              key={key}
              {...itemProps}
              {...items[key]}
            />
          ))}
        </div>
      </div>
    );
  }
};

Base.propTypes = {
  base: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  itemProps: PropTypes.object.isRequired,
};

export default DropTarget(
  ItemType,
  dropTarget,
  collect,
)(Base);
