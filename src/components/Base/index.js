import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Item, { ItemType } from '../Item';

import { domainRoot } from '../../utils';

import styles from './styles.scss';

const dropTarget = {
  canDrop: (props, monitor) => monitor.isOver(),
  drop: (props, monitor, component) => {
    const { handleDrop, snapToGrid } = props;
    const item = monitor.getItem();
    const baseOffset = component.ref.getBoundingClientRect();
    const clientOffset = monitor.getSourceClientOffset();

    const x = snapToGrid(Math.round(Math.abs(baseOffset.x - clientOffset.x)));
    const y = snapToGrid(Math.round(Math.abs(baseOffset.y - clientOffset.y)));

    return handleDrop(item, x, y);
  },
};

const collect = connect => ({
  connectDropTarget: connect.dropTarget(),
});

export const RenderBase = ({ ItemComponent, base, items, itemProps, setRef }) => (
  <div className={styles.base} ref={setRef}>
    <img className={styles.image} src={`${domainRoot()}/assets/bases/${base}.png`} id="baseImage" />
    <div className={styles.items}>
      {Object.keys(items).map(key => (
        <ItemComponent
          key={key}
          {...itemProps}
          {...items[key]}
        />
      ))}
    </div>
  </div>
);

class Base extends Component {
  render() {
    const { connectDropTarget, ...otherProps } = this.props;

    const base = RenderBase({
      ItemComponent: Item,
      setRef: (ref) => { this.ref = ref; },
      ...otherProps,
    });

    return connectDropTarget(base);
  }
};

Base.propTypes = {
  base: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  itemProps: PropTypes.object.isRequired,
  snapToGrid: PropTypes.func.isRequired,
};

export default DropTarget(
  ItemType,
  dropTarget,
  collect,
)(Base);
