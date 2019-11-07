import { last, defaultTo, path } from 'ramda';
import {
  MFNavigationHistoryRoute,
  MFNavigationTab,
  MFNavigationReducerConfig
} from './MFNavigationTypes';

export const routerReducer: Function = (config: MFNavigationReducerConfig) => {
  const initialState = buildInitialState(config);
  const reducer = (state, action) => {
    const { payload } = action;
    return {
      setRoute: () => {
        if (state.isNavigating) {
          return state.destinations.find(
            ({ route }) => route == payload.route
          ) === undefined
            ? { ...state, destinations: [...state.destinations, payload] }
            : state;
        }

        const history = [...state.history, payload];
        const tabRoute = [...state.tabRoutes[state.activeTab], payload];
        if (config.adapter) {
          config.adapter.setRoute({
            route: payload.route,
            tab: state.activeTab || 0
          });
        }

        return {
          ...state,
          isNavigating: true,
          history,
          destinations: [...state.destinations, payload],
          route: last(history),
          tabRoutes: state.tabRoutes.map((route, index) =>
            index === state.activeTab ? tabRoute : route
          )
        };
      },
      navigateComplete: () => {
        const newDestinations = state.destinations.slice(1);
        if (state.destinations.length > 1 && config.adapter) {
          config.adapter.setRoute(newDestinations[0]);

          return {
            ...state,
            poppedRoute: { route: '' },
            isNavigating: false,
            history: [...state.history, newDestinations[0]],
            destinations: newDestinations
          };
        }

        return {
          ...state,
          isNavigating: false,
          destinations: newDestinations
        };
      },
      resetNavigation: () => ({
        ...state,
        history: [state.history[0], last(state.history)],
        routeToPop: last(state.history),
        tabRoutes: state.tabRoutes.map((route, index) =>
          index === state.activeTab ? [route[0], last(route)] : route
        ),
        isNavigatingBack: true
      }),
      navigateBack: () => ({
        ...state,
        routeToPop: state.history[state.history.length - 1],
        isNavigatingBack: true
      }),
      navigateBackComplete: () => {
        const history = [...state.tabRoutes[state.activeTab]];

        const poppedRoute = history.pop();

        const updatedTabRoutes = state.tabRoutes.reduce(
          (current, route, index) => [
            ...current,
            index === state.activeTab ? history : route
          ],
          []
        );

        if (config.adapter) {
          const currentRoute = history[history.length - 1];
          config.adapter.setRoute(currentRoute);
        }

        const newHistory = history.slice();

        return {
          ...state,
          poppedRoute,
          isNavigatingBack: false,
          history: newHistory,
          tabRoutes: updatedTabRoutes,
          route: last(newHistory)
        };
      },
      setTitleCache: () => ({
        ...state,
        titleCache: {
          ...state.titleCache,
          ...payload
        }
      }),
      setNavbarHidden: () => ({
        ...state,
        navbarHidden: payload
      }),
      setActiveTab: () => {
        if (state.isNavigating || state.isNavigatingBack) {
          return state;
        }

        if (config.adapter) {
          config.adapter.setTab({
            route: state.tabRoutes[payload][0].route,
            tab: payload
          });
        }

        return {
          ...state,
          activeTab: payload,
          activeTabIndex: payload,
          history: [state.tabRoutes[payload][0]],
          route: state.tabRoutes[payload][0]
        };
      }
    }[action.type]();
  };
  return { reducer, initialState };
};

export const buildInitialState = (config: MFNavigationReducerConfig) => {
  const initialRoute: MFNavigationHistoryRoute = {
    route: path(['routeConfig', 'initialRoute'], config)
  };
  const tabs: Array<MFNavigationTab> = defaultTo(
    [],
    path(['routeConfig', 'tabs'], config)
  );
  const tabRoutes: Array<Array<MFNavigationHistoryRoute>> =
    tabs.length > 0
      ? tabs.map((tab: MFNavigationTab) => [{ route: tab.initial }])
      : [[initialRoute]];
  const queryInitialTab =
    config.adapter &&
    config.adapter.getTab(config.routeConfig.initialActiveTab);
  const activeTab = defaultTo(
    0,
    queryInitialTab || path(['routeConfig', 'initialActiveTab'], config)
  );

  const history: Array<MFNavigationHistoryRoute> = tabRoutes[activeTab];

  return {
    initialActiveTab: activeTab,
    initialRoute: config.routeConfig.initialRoute,
    renderTopNav: config.routeConfig.renderTopNav,
    routes: config.routeConfig.routes,
    navbarHidden: false,
    isNavigating: false,
    destinations: [],
    isNavigatingBack: false,
    titleCache: {},
    routeToPop: '',
    history,
    poppedRoute: { route: '' },
    activeTab,
    isModal: false,
    tabRoutes,
    route: last(history),
    activeTabIndex: activeTab
  };
};

const createActionsObj = (actions: Array<string>, dispatch: Function) =>
  actions.reduce((prev, curr) => {
    return { ...prev, [curr]: (payload) => dispatch({ type: curr, payload }) };
  }, {});

const actionTypes = [
  'setRoute',
  'navigateComplete',
  'resetNavigation',
  'navigateBack',
  'navigateBackComplete',
  'setTitleCache',
  'setNavbarHidden',
  'setActiveTab'
];

export const createActions = (dispatch: Function) =>
  createActionsObj(actionTypes, dispatch);
