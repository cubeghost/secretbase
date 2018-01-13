import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

import Item from 'components/Item';

import { snapToGrid } from 'src/utils';

import styles from './styles.scss';

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
});

function getItemStyles({ initialOffset, currentOffset }) {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  let { x, y } = currentOffset;

  // TODO determine how much of this is necessary/correct
  x -= initialOffset.x;
  y -= initialOffset.y;
  x = snapToGrid(x);
  y = snapToGrid(y);
  x += initialOffset.x;
  y += initialOffset.y;

  return {
    transform: `translate(${x}px, ${y}px)`
  };
}

class CustomDragLayer extends Component {

  render() {
    const { item, isDragging, initialOffset, currentOffset } = this.props

    if (!isDragging) {
      return null;
    }

    return (
      <div className={styles.customDragLayer}>
        <Item type={item.type} style={getItemStyles({ initialOffset, currentOffset })} />
      </div>
    )
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  initialOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  isDragging: PropTypes.bool.isRequired,
};

export default DragLayer(collect)(CustomDragLayer);
