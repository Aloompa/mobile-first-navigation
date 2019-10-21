import routerReducer, { buildInitialState, setRoute } from '../routerReducer';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore([]);

const routeConfig = {
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

describe('The router reducer', () => {
  it('Should set route', () => {
    const reducer = routerReducer(routeConfig);
    const initialState = buildInitialState(routeConfig);
    const store = mockStore();

    setRoute.dispatch(
      reducer({
        route: 'Page2'
      })
    );

    const state = reducer(initialState, store.getActions()[0]);

    expect(state.history[0].name).toBe('Page2');
  });
});
