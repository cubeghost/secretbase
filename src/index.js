import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import 'react-select/dist/react-select.css';
import './styles/index.scss';

import App from 'components/App';

ReactDOM.render(<App />, document.getElementById('react-root'));
