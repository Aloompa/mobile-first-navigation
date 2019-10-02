import * as React from 'react';
import Home from './routes/Home';
import Modal from './routes/Modal';
import Page2 from './routes/Page2';
import Page2b from './routes/Page2b';
import Page3 from './routes/Page3';
import { always } from 'ramda';
import { createRoutes } from '@aloompa/mobile-first-router';
import { TabButton, TopNav } from '@aloompa/mobile-first-components';

const Routes = createRoutes({
  tabs: [
    {
      button: (isSelected: boolean, onPress: Function) => (
        <TabButton
          selected={isSelected}
          onPress={onPress}
          iconUnselectedColor={'#ccc'}
          iconHeight={18}
          iconWidth={20}
          iconSelectedColor={'#FF00FF'}
          title={'Browse'}
          iconUrl={
            'https://s3.amazonaws.com/assets.aloompa.com/TestFolder/reservations-tab-icon-browse.svg'
          }
        />
      ),
      initial: 'Home'
    },
    {
      button: (isSelected: boolean, onPress: Function) => (
        <TabButton
          selected={isSelected}
          onPress={onPress}
          iconUnselectedColor={'#ccc'}
          iconHeight={18}
          iconWidth={22}
          iconSelectedColor={'#FF00FF'}
          title={'Home 2'}
          iconUrl={
            'https://s3.amazonaws.com/assets.aloompa.com/TestFolder/reservations-tab-icon-tickets.svg'
          }
        />
      ),
      initial: 'Page2'
    },
    {
      button: (isSelected: boolean, onPress: Function) => (
        <TabButton
          selected={isSelected}
          onPress={onPress}
          iconUnselectedColor={'#ccc'}
          iconHeight={22}
          iconWidth={22}
          iconSelectedColor={'#FF00FF'}
          title={'Home 3'}
          iconUrl={
            'https://s3.amazonaws.com/assets.aloompa.com/TestFolder/reservations-tab-icon-account.svg'
          }
        />
      ),
      initial: 'Page3'
    }
  ],
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
});

export default Routes;
