import routerReducer, { buildInitialState } from '../routerReducer';

export const routeConfig = {
  initialActiveTab: 0,
  initialRoute: 'BrowseHome',
  tabs: [{}, {}, {}],
  routes: {
    BrowseHome: {
      getTitle: () => 'Home'
    },
    CategoryView: {
      getTitle: () => 'Page2'
    },
    ItemView: {
      getTitle: () => 'Page3'
    },
    ItemDetails: {
      getTitle: () => 'Modal'
    }
  },
  renderTopNav: {},
  topNavHeight: 52
};

export const initialState = buildInitialState(routeConfig);

export const navigatingState = {
  ...initialState,
  destinations: [{ route: 'Page2' }],
  isNavigating: true
};

export const navigatedState = {
  ...initialState,
  history: [
    {
      route: 'Home'
    },
    {
      route: 'Page2'
    },
    {
      route: 'Page3'
    }
  ]
};

export const navigatingBackState = {
  ...navigatedState,
  activeTab: 0,
  isNavigatingBack: true,
  routeToPop: { route: 'Page3' },
  tabRoutes: [[...navigatedState.history]]
};

export const navbarHiddenState = {
  ...initialState,
  navbarHidden: true
};

export const activeNavigatedTabState = {
  ...initialState,
  activeTab: 0,
  history: [{ route: 'Home0' }, { route: 'Page20' }],
  tabRoutes: [
    [{ route: 'Home0' }, { route: 'Page20' }],
    [{ route: 'Home1' }, { route: 'Page21' }]
  ]
};
