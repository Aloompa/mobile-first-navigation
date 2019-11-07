## Mobile First Router

### Define your routes

```
import { createRoutes } from '@aloompa/mobile-first-router/lib';

const Routes = createRoutes({
    routes: {
        Home: {
            route: Component,
            getTitle: () => 'Home'
        },
        AnotherRoute: {
            route: AnotherComponent,
            getTitle: () => 'Another Page'
        },
        // routes with modal as the mode don't get added to the history stack.
        ModalRoute: {
            route: ModalComponent,
            getTitle: () => 'Modal Page',
            mode: 'modal'
        }
    },
    renderTopNav: NavComponent
});

export default Routes;
```

### Tab controller

```
const Routes = createRoutes({
  tabs: [
    {
      button: (isSelected: boolean) => (
        <TabButton
          selected={isSelected}
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
      button: (isSelected: boolean) => (
        <TabButton
          selected={isSelected}
          iconUnselectedColor={'#ccc'}
          iconHeight={18}
          iconWidth={22}
          iconSelectedColor={'#FF00FF'}
          title={'Home 2'}
          iconUrl={
            'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-browse.svg'
          }
        />
      ),
      initial: 'Page2'
    },
    {
      button: (isSelected: boolean) => (
        <TabButton
          selected={isSelected}
          iconUnselectedColor={'#ccc'}
          iconHeight={22}
          iconWidth={22}
          iconSelectedColor={'#FF00FF'}
          title={'Home 3'}
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
      getTitle: always('Home')
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
```

### Add them to your root

```
import * as React from 'react';

import { Provider } from 'react-redux'
import Routes from './Routes';
import store from './store';

const App = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
);
```

### Push View

```
props.setRoute({
    route: 'AnotherRoute',
    params: {}
});
```

```
props.setRoute({
    route: 'AnotherRoute',
    params: {
        navigationTitle: 'Some Navigation Title'
    }
});
```

> - pushing a view with a specific title

### Pop View

`props.navigateBack();`

### Example

> - `clone git@github.com:Aloompa/mobile-first-router.git`

> - `yarn run server`

> - navigate to http://localhost:3001

[Open example project](https://github.com/Aloompa/mobile-first-router/tree/master/src/examples)

## Contributing

We encourage you to contribute to Mobile First Router by submitting bug reports and pull requests through [Github](http//github.com).

## License

Mobile First Router is released under The [MIT License](http://www.opensource.org/licenses/MIT) (MIT)

Copyright (c) [2015][aloompa llc]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
