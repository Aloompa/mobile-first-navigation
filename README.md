# Mobile First Navigation Monorepo

A navigational router with an emphasis on being Mobile and Developer friendly 📱

## Packages

### Mobile First Router

#### demo

Coming soon...

#### install

`npm i @aloompa/mobile-first-router`

#### configuration

##### Standard

```Routes.jsx
import Home from './routes/Home';
import Modal from './routes/Modal';
import Page2 from './routes/Page2';
import Page2b from './routes/Page2b';
import Page3 from './routes/Page3';
import { createRoutes } from '@aloompa/mobile-first-router';
import { TopNav } from '@aloompa/mobile-first-components';

export const routeConfig = {
  initialRoute: 'Home',
  routes: {
    Home: {
      route: Home,
      getTitle: () => 'Home'
    },
    Page2: {
      route: Page2,
      getTitle:  () => 'Page 2'
    },
    Page2b: {
      route: Page2b,
      getTitle:  () => 'Page 2b'
    },
    Page3: {
      route: Page3,
      getTitle:  () => 'Page 3'
    },
    Modal: {
      route: Modal,
      getTitle: () => 'Modal Page',
      mode: 'modal'
    }
  },
  renderTopNav: TopNav
};

const Routes = createRoutes(routeConfig);

export default Routes;
```

##### With Tabs

```Routes.jsx
import * as React from 'react';
import Home from './routes/Home';
import Modal from './routes/Modal';
import Page2 from './routes/Page2';
import Page2b from './routes/Page2b';
import Page3 from './routes/Page3';
import { createRoutes } from '@aloompa/mobile-first-router';
import { TabButton, TopNav } from '@aloompa/mobile-first-components';

export const routeConfig = {
  initialActiveTab: 1,
  initialRoute: 'Home',
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
            'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-browse.svg'
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
            'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-tickets.svg'
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
          title={'Page 3'}
          iconUrl={
            'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-account.svg'
          }
        />
      ),
      initial: 'Page3'
    }
  ],
  routes: {
    Home: {
      route: Home,
      getTitle: () => 'Home'
    },
    Page2: {
      route: Page2,
      getTitle:  () => 'Page 2'
    },
    Page2b: {
      route: Page2b,
      getTitle:  () => 'Page 2b'
    },
    Page3: {
      route: Page3,
      getTitle:  () => 'Page 3'
    },
    Modal: {
      route: Modal,
      getTitle: () => 'Modal Page',
      mode: 'modal'
    }
  },
  renderTopNav: TopNav
};

const Routes = createRoutes(routeConfig);

export default Routes;
```

```App.jsx
import * as React from 'react';

import Routes from './Routes';

const App = () => <Routes />;

export default App;
```

### Mobile First Components

#### install

`npm i @aloompa/mobile-first-components`

### Developing locally

`yarn run build`

`yarn run example`

### Publish

`yarn run release`

### Mobile First Storybook

#### live storybook demo and documentation

Coming soon...

For now:

`yarn run build`

`yarn run storybook`
