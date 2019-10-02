// import * as React from 'react';
import Home from './routes/Home';
import Modal from './routes/Modal';
import Page2 from './routes/Page2';
import Page2b from './routes/Page2b';
import Page3 from './routes/Page3';
import { always } from 'ramda';
import { createRoutes } from '../index';
import { TopNav } from '@aloompa/mobile-first-components';

export const routeConfig = {
  initialRoute: 'Home',
  routes: {
    Home: {
      route: Home,
      getTitle: always('')
    },
    Page2: {
      route: Page2,
      getTitle: always('Page 2')
    },
    Page2b: {
      route: Page2b,
      getTitle: always('Page 2B')
    },
    Page3: {
      route: Page3,
      getTitle: always('Page 3 Home')
    },
    Modal: {
      route: Modal,
      getTitle: always('Modal'),
      mode: 'modal'
    }
  },
  renderTopNav: TopNav
};

const Routes = createRoutes(routeConfig);

export default Routes;
