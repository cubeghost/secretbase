import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';
import autobind from 'class-autobind';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import download from 'downloadjs';
import queryString from 'query-string';
import store from 'store';

import Header from '../Header';
import Footer from '../Footer';
import Options from '../Options';
import Base from '../Base';
import ItemPicker from '../ItemPicker';
import BasePicker from '../BasePicker';
import CustomDragLayer from '../CustomDragLayer';
import StaticRender from '../StaticRender';

import {
  STRICT_GRID_SPACING,
  EASY_GRID_SPACING,
  POOF_DURATION,
  LOCALSTORAGE_KEY
} from '../../constants';
import { domainRoot, randomId } from '../../utils';

import styles from './styles.scss';

class App extends Component {

  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      base: 'base_0001_2',
      items: {},
      enableUnofficialItems: false,
      enableStrictGrid: true,
      isSaving: false,
      loadedFromUrl: false,
    };
  }

  componentDidMount() {
    // TODO move this shit
    const acceptableKeys = Object.keys(this.state);

    if (window.location.search) {
      const parsed = queryString.parse(window.location.search);

      if (parsed && parsed.save) {

        let saveState;
        try {
          const saveStateString = window.atob(parsed.save);
          saveState = JSON.parse(saveStateString);
        } catch (e) {
          console.log(e); // ignore
        }

        if (saveState) {
          Object.keys(saveState).forEach(key => {
            if (acceptableKeys.indexOf(key) < 0) {
              delete saveState[key];
            }
          });

          this.setState({
            ...saveState,
            loadedFromUrl: true
          }); // TODO gotta really think through how safe this is
        }

      }
    } else {
      const saveState = store.get(LOCALSTORAGE_KEY);
      if (saveState) {
        Object.keys(saveState).forEach(key => {
          if (acceptableKeys.indexOf(key) < 0) {
            delete saveState[key];
          }
        });
        this.setState(saveState);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLoadedFromUrl = prevState.loadedFromUrl;
    const { loadedFromUrl } = this.state;
    const saveState = this.getSaveState();
    const previousSaveState = store.get(LOCALSTORAGE_KEY);

    // ignore if initial load from URL, otherwise save changes to localStorage

    if (!prevLoadedFromUrl && loadedFromUrl) {
      return;
    }

    if (saveState !== previousSaveState) {
      store.set(LOCALSTORAGE_KEY, saveState);
    }
  }

  snapToGrid(d) {
    const gridSpacing = this.state.enableStrictGrid ? STRICT_GRID_SPACING : EASY_GRID_SPACING;
    return Math.round(d / gridSpacing) * gridSpacing;
  }

  handleDrop(item, x, y) {
    const items = Object.assign({}, this.state.items);

    if (item.id) {
      items[item.id].x = x;
      items[item.id].y = y;
    } else {
      const id = randomId();
      const newItem = {
        id: id,
        type: item.type,
        x: x,
        y: y,
      };
      items[id] = newItem;
    }

    this.setState({ items });
  }

  removeItem(item) {
    const items = Object.assign({}, this.state.items);

    items[item.id].isRemoving = true;

    this.setState({ items }, () => {
      setTimeout(() => {

        const items = Object.assign({}, this.state.items);

        delete items[item.id];

        this.setState({ items });

      }, POOF_DURATION);
    });
  }

  selectBase(base) {
    if (base) {
      this.setState({
        base: base.id
      });
    }
  }

  toggleUnofficialItems(event) {
    this.setState({
      enableUnofficialItems: event.target.checked
    });
  }

  toggleStrictGrid(event) {
    this.setState({
      enableStrictGrid: event.target.checked
    });
  }

  clearItems() {
    this.setState({
      items: {},
      loadedFromUrl: false,
    });
  }

  getSaveState() {
    const { base, items, enableUnofficialItems, enableStrictGrid } = this.state;
    const saveState = { base, items, enableUnofficialItems, enableStrictGrid };
    return saveState;
  }

  getBase64SaveState() {
    const saveState = this.getSaveState();
    const string = JSON.stringify(saveState);
    const base64 = window.btoa(string);
    return base64;
  }

  getShareUrl() {
    return `${domainRoot()}/?save=${this.getBase64SaveState()}`;
  }

  save() {
    const { base, items } = this.state;

    this.setState({
      isSaving: true
    });

    const rendered = ReactDOMServer.renderToStaticMarkup(
      <StaticRender
        base={base}
        items={items}
      />
    );
    const { width, height } = document.getElementById('baseImage').getBoundingClientRect();
    const stylesheet = document.styleSheets[0].href;

    const html = `<html><head><link rel="stylesheet" href="${stylesheet}"></head><body>${rendered}</body></html>`;

    fetch(`${domainRoot()}/.netlify/functions/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        html,
        width,
        height
      })
    }).then(response => {
      if (!response.ok) { throw Error(response.statusText); }
      return response.blob();
    }).then(blob => {
      download(blob, `secretbase_${randomId()}.png`);
      this.setState({
        isSaving: false,
      });
    }).catch(error => {
      // TODO
      this.setState({
        isSaving: false,
      });
    });
  }

  render() {
    const { base, items, enableUnofficialItems, enableStrictGrid, isSaving } = this.state;
    const itemProps = {
      removeItem: this.removeItem,
    };

    return (
      <div className={styles.app} style={{ '--poofDuration': POOF_DURATION }}>
        <div className={styles.top}>
          <Header />
          <BasePicker
            base={base}
            selectBase={this.selectBase}
          />
        </div>
        <section className={styles.main}>
          <div className={classNames(styles.column, styles.columnLeft)}>
            <Options
              enableUnofficialItems={enableUnofficialItems}
              toggleUnofficialItems={this.toggleUnofficialItems}
              enableStrictGrid={enableStrictGrid}
              toggleStrictGrid={this.toggleStrictGrid}
              clearItems={this.clearItems}
              getShareUrl={this.getShareUrl}
              save={this.save}
              isSaving={isSaving}
            />
            <ItemPicker
              itemProps={itemProps}
              enableUnofficialItems={enableUnofficialItems}
            />
          </div>
          <div className={classNames(styles.column, styles.columnRight)}>
            <Base
              base={base}
              items={items}
              itemProps={itemProps}
              handleDrop={this.handleDrop}
              snapToGrid={this.snapToGrid}
            />
            <Footer />
          </div>
        </section>
        <CustomDragLayer
          snapToGrid={this.snapToGrid}
        />
      </div>
    );
  }

};

export default DragDropContext(HTML5Backend)(App);
