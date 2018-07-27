import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

declare let global: any;

global.document && ReactDOM.render((
    <App />
), global.document.getElementById('root') as HTMLElement);
