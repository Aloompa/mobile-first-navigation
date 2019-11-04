import routerReducer, {
  setRoute,
  navigateBack,
  navigateBackComplete,
  navigateComplete,
  resetNavigation,
  setActiveTab,
  setNavbarHidden,
  setTitleCache
} from '../routerReducer';
import configureMockStore from 'redux-mock-store';
import {
  activeNavigatedTabState,
  initialState,
  navbarHiddenState,
  navigatedState,
  navigatingBackState,
  navigatingState,
  routeConfig
} from '../__mocks__/routerReducer.mock';

const mockStore = configureMockStore([]);

describe('The router reducer', () => {
  const reducer = routerReducer(routeConfig);

  it('Should add a route stack to history and set navigating to true', () => {
    const store = mockStoreAndDispatch(
      setRoute({
        route: 'Page2'
      })
    );

    const currentState = { ...initialState };
    expect(currentState.history[1]).toBeFalsy();
    expect(currentState.isNavigating).toBe(false);

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.history[1].route).toBe('Page2');
    expect(updatedState.isNavigating).toBe(true);
  });

  it('Should set navigating to false', () => {
    const store = mockStoreAndDispatch(navigateComplete());

    const currentState = { ...navigatingState };
    expect(currentState.isNavigating).toBe(true);

    const updatedState = updateState(reducer, currentState, store);
    expect(currentState.destinations.length).toBeGreaterThan(
      updatedState.destinations.length
    );
    expect(updatedState.isNavigating).toBe(false);
  });

  it('Should reset navigation', () => {
    const store = mockStoreAndDispatch(resetNavigation());

    const currentState = { ...navigatedState };
    expect(currentState.isNavigatingBack).toBe(false);
    expect(currentState.history.length).toBeGreaterThan(1);

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.isNavigatingBack).toBe(true);
    expect(updatedState.history.length).toBe(2);
    expect(updatedState.routeToPop).toBe(
      currentState.history[currentState.history.length - 1]
    );
  });

  it('Should set a route to be popped', () => {
    const store = mockStoreAndDispatch(navigateBack());

    const currentState = { ...navigatedState };
    expect(currentState.isNavigatingBack).toBe(false);
    expect(currentState.history.length).toBe(3);

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.isNavigatingBack).toBe(true);
    expect(updatedState.routeToPop).toBe(currentState.history[2]);
  });

  it('Should end navigating back', () => {
    const store = mockStoreAndDispatch(navigateBackComplete());

    const currentState = { ...navigatingBackState };
    expect(currentState.isNavigatingBack).toBe(true);
    expect(currentState.history.length).toBe(3);
    expect(currentState.history[currentState.history.length - 1].route).toBe(
      'Page3'
    );
    expect(currentState.routeToPop.route).toBe('Page3');

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.isNavigatingBack).toBe(false);
    expect(updatedState.history.length).toBe(2);
    expect(updatedState.history[updatedState.history.length - 1].route).toBe(
      'Page2'
    );
    expect(updatedState.poppedRoute.route).toBe('Page3');
    expect(updatedState.history).toEqual(
      updatedState.tabRoutes[updatedState.activeTab]
    );
  });

  it('Should set title cache', () => {
    const store = mockStoreAndDispatch(
      setTitleCache({
        title: 'Cache'
      })
    );

    const currentState = { ...initialState };
    expect(currentState.titleCache.title).toBeFalsy();

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.titleCache).toBeTruthy();
    expect(updatedState.titleCache.title).toBe('Cache');
  });

  it('Should hide the navbar', () => {
    const store = mockStoreAndDispatch(setNavbarHidden(true));

    const currentState = { ...initialState };
    expect(currentState.navbarHidden).toBe(false);

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.navbarHidden).toBe(true);
  });

  it('Should show the navbar', () => {
    const store = mockStoreAndDispatch(setNavbarHidden(false));

    const currentState = { ...navbarHiddenState };
    expect(currentState.navbarHidden).toBe(true);

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.navbarHidden).toBe(false);
  });

  it(`Should changes tabs, setting the history to the new tab's history`, () => {
    const store = mockStoreAndDispatch(setActiveTab(1));

    const currentState = { ...activeNavigatedTabState };
    expect(currentState.activeTab).toBe(0);
    expect(currentState.history[0].route).toBe('Home0');

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.activeTab).toBe(1);
    expect(updatedState.history[0].route).toBe('Home1');
  });

  it('Should not allow tab changing during navigation', () => {
    const store = mockStoreAndDispatch(setActiveTab(1));

    const currentState = { ...activeNavigatedTabState, isNavigating: true };
    expect(currentState.activeTab).toBe(0);
    expect(currentState.history[0].route).toBe('Home0');
    expect(currentState.isNavigating).toBe(true);

    const updatedState = updateState(reducer, currentState, store);
    expect(updatedState.activeTab).toBe(0);
  });
});

const mockStoreAndDispatch = (action) => {
  const store = mockStore();
  store.dispatch(action);

  return store;
};

const updateState = (reducer, currentState, store) =>
  reducer(currentState, store.getActions()[0]);
