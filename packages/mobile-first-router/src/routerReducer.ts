import { createActions, handleActions } from 'redux-actions';

import { last, defaultTo, path } from 'ramda';
import {
  MFNavigationHistoryRoute,
  MFNavigationTab,
  MFNavigationReducerConfig
} from './MFNavigationTypes';

const SET_ROUTE = 'SET_ROUTE';
const NAVIGATE_COMPLETE = 'NAVIGATE_COMPLETE';
const NAVIGATE_BACK = 'NAVIGATE_BACK';
const NAVIGATE_BACK_COMPLETE = 'NAVIGATE_BACK_COMPLETE';
const SET_TITLE_CACHE = 'SET_TITLE_CACHE';
const RESET_NAVIGATION = 'RESET_NAVIGATION';
const SET_NAVBAR_HIDDEN = 'SET_NAVBAR_HIDDEN';
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export const {
  setRoute,
  navigateComplete,
  navigateBack,
  navigateBackComplete,
  setTitleCache,
  resetNavigation,
  setNavbarHidden,
  setActiveTab,
  routeActiveTab
} = createActions(
  {},
  SET_ROUTE,
  NAVIGATE_COMPLETE,
  NAVIGATE_BACK,
  NAVIGATE_BACK_COMPLETE,
  SET_TITLE_CACHE,
  RESET_NAVIGATION,
  SET_NAVBAR_HIDDEN,
  SET_ACTIVE_TAB
);

const routerReducer: Function = (config: MFNavigationReducerConfig) => {
  const initialState = buildInitialState(config);

  return handleActions(
    {
      [SET_ROUTE]: (state, { payload }) => {
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
          tabRoutes: state.tabRoutes.map((route, index) =>
            index === state.activeTab ? tabRoute : route
          )
        };
      },

      [NAVIGATE_COMPLETE]: (state) => {
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

      [RESET_NAVIGATION]: (state) => ({
        ...state,
        history: [state.history[0], last(state.history)],
        routeToPop: last(state.history),
        tabRoutes: state.tabRoutes.map((route, index) =>
          index === state.activeTab ? [route[0], last(route)] : route
        ),
        isNavigatingBack: true
      }),

      [NAVIGATE_BACK]: (state) => ({
        ...state,
        routeToPop: state.history[state.history.length - 1],
        isNavigatingBack: true
      }),

      [NAVIGATE_BACK_COMPLETE]: (state) => {
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

        return {
          ...state,
          poppedRoute,
          isNavigatingBack: false,
          history: history.slice(),
          tabRoutes: updatedTabRoutes
        };
      },

      [SET_TITLE_CACHE]: (state, { payload }) => ({
        ...state,
        titleCache: {
          ...state.titleCache,
          ...payload
        }
      }),

      [SET_NAVBAR_HIDDEN]: (state, { payload }) => ({
        ...state,
        navbarHidden: payload
      }),

      [SET_ACTIVE_TAB]: (state, { payload }) => {
        if (state.isNavigating || state.isNavigatingBack) {
          return state;
        }

        if (config.adapter) {
          config.adapter.setTab({
            route: state.history[state.history.length - 1].route,
            tab: payload
          });
        }

        return {
          ...state,
          activeTab: payload,
          history: state.tabRoutes[payload]
        };
      }
    },
    initialState
  );
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
    tabRoutes
  };
};

export default routerReducer;
