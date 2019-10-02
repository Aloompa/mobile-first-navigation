import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TabButton, TopNav } from '@aloompa/mobile-first-components';
import { createRoutes, routerReducer } from '@aloompa/mobile-first-router';
import {
  AccountHome,
  BrowseHome,
  CategoryView,
  ItemDetails,
  ItemView,
  PurchasesHome
} from './story-routes';

const routeConfig = {
  initialActiveTab: 0,
  initialRoute: 'BrowseHome',
  tabs: [
    {
      button: (isSelected: boolean, onPress: Function) => (
        <TabButton
          selected={isSelected}
          onPress={onPress}
          iconUnselectedColor={'#ccc'}
          iconHeight={18}
          iconWidth={20}
          iconSelectedColor={'#000'}
          title={'Browse'}
          iconUrl={
            'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-browse.svg'
          }
        />
      ),
      initial: 'BrowseHome'
    },
    {
      button: (isSelected: boolean, onPress: Function) => (
        <TabButton
          selected={isSelected}
          onPress={onPress}
          iconUnselectedColor={'#ccc'}
          iconHeight={18}
          iconWidth={22}
          iconSelectedColor={'#000'}
          title={'Purchases'}
          iconUrl={
            'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-tickets.svg'
          }
        />
      ),
      initial: 'PurchasesHome'
    },
    {
      button: (isSelected: boolean, onPress: Function) => (
        <TabButton
          selected={isSelected}
          onPress={onPress}
          iconUnselectedColor={'#ccc'}
          iconHeight={22}
          iconWidth={22}
          iconSelectedColor={'#000'}
          title={'Account'}
          iconUrl={
            'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-account.svg'
          }
        />
      ),
      initial: 'AccountHome'
    }
  ],
  routes: {
    BrowseHome: {
      route: BrowseHome,
      getTitle: () => 'Browse'
    },
    CategoryView: {
      route: CategoryView,
      getTitle: () => 'Browse'
    },
    ItemView: {
      route: ItemView,
      getTitle: () => 'Item'
    },
    ItemDetails: {
      route: ItemDetails,
      mode: 'modal'
    },
    PurchasesHome: {
      route: PurchasesHome,
      getTitle: () => 'Purchases'
    },
    AccountHome: {
      route: AccountHome,
      getTitle: () => 'Account'
    }
  },
  renderTopNav: TopNav,
  topNavHeight: 52
};

const Router = createRoutes(routeConfig);

import { combineReducers } from 'redux';
import { createStore } from 'redux';

const combinedReducers = combineReducers({
  router: routerReducer({
    routeConfig,
    initialRoute: 'BrowseHome'
  })
});

const store = createStore(combinedReducers);

storiesOf('Router', module).add('default', () => <Router store={store} />);
