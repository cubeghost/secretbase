import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { domainRoot } from 'src/utils';

import styles from './styles.scss';

export const ItemType = 'item';

const dragSource = {
  beginDrag: (props) => ({
    type: props.type,
    id: props.id,
    x: props.x || 0,
    y: props.y || 0,
  }),
  endDrag: (props, monitor, component) => {
    const dropResult = monitor.getDropResult();
    if (props.id && !dropResult) {
      props.removeItem(props);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

export const RenderItem = ({ id, type, style, x, y, isRemoving, isDragging }) => {
  const mergedStyle = style || {};

  if (x !== undefined && y !== undefined) {
    mergedStyle.position = 'absolute';
    mergedStyle.top = `${y}px`;
    mergedStyle.left = `${x}px`;
  }

  if (id && (isDragging || isRemoving)) {
    mergedStyle.opacity = 0;
  }

  return (
    <div className={styles.item} style={mergedStyle}>
      <img src={`${domainRoot()}/assets/items/${type}`} alt="" />
    </div>
  );
};

class Item extends Component {

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const { connectDragSource, ...otherProps } = this.props;

    const item = RenderItem(otherProps);

    return connectDragSource(item);
  }
}

Item.propTypes = {
  type: PropTypes.string.isRequired, // filename
  id: PropTypes.string,
  removeItem: PropTypes.func,
};

export default DragSource(
  ItemType,
  dragSource,
  collect,
)(Item);
