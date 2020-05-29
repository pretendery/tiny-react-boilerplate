import React, { createElement } from 'react';
import { render } from 'react-dom';

import Main from './components/Main';

const rootEle = document.getElementById('root');

render(createElement(React.StrictMode, null, createElement(Main)), rootEle);
