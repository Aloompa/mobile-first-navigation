import { createActions, handleActions } from 'redux-actions';

import { last } from 'ramda';

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
} = createActions({}, SET_ROUTE, NAVIGATE_COMPLETE, NAVIGATE_BACK, NAVIGATE_BACK_COMPLETE, SET_TITLE_CACHE, RESET_NAVIGATION, SET_NAVBAR_HIDDEN, SET_ACTIVE_TAB);

const routerReducer = (config: {
    activeTab?: number,
    initialTabRoutes?: string[],
    initialRoute: string,
    adapter?: {
        getRoute: Function,
        setRoute: Function
    }
}) => {

    const initialRoute = {
        route: config.initialRoute
    };

    const activeTab = config.activeTab || 0;
    const tabRoutes = config.initialTabRoutes ? config.initialTabRoutes.map(route => [{route}]) : [[initialRoute]];

    const initialState = {
        navbarHidden: false,
        isNavigating: false,
        destinations: [],
        isNavigatingBack: false,
        titleCache: {},
        history: tabRoutes[activeTab],
        activeTab,
        tabRoutes
    };

    return handleActions({

        [SET_ROUTE]: (state, { payload }) => {
            if (state.isNavigating) {
                return (
                    state.destinations.find(({ route }) => route == payload.route) === undefined
                    ? { ...state, destinations: [...state.destinations, payload] }
                    : state
                );
            }

            const history = [...state.history, payload];
            const tabRoute = [...state.tabRoutes[state.activeTab], payload];
            if (config.adapter) {
                config.adapter.setRoute(payload);
            }
            
            return {
                ...state,
                isNavigating: true,
                history,
                destinations: [...state.destinations, payload],
                tabRoutes: state.tabRoutes.map((route, index) => (index === state.activeTab) ? tabRoute : route )
            };
        },

        [NAVIGATE_COMPLETE]: (state) => {
            const newDestinations = state.destinations.slice(1);
            if (state.destinations.length > 1 && config.adapter) {
                config.adapter.setRoute(newDestinations[0]);

                return ({
                    ...state,
                    isNavigating: false,
                    history: [...state.history, newDestinations[0]],
                    destinations: newDestinations
                });
            }

            return ({
                ...state,
                isNavigating: false,
                destinations: newDestinations
            });
        },

        [RESET_NAVIGATION]: (state) => ({
            ...state,
            history: [state.history[0], last(state.history)],
            tabRoutes: state.tabRoutes.map((route, index) => (index === state.activeTab) ? [route[0], last(route)] : route),
            isNavigatingBack: true
        }),

        [NAVIGATE_BACK]: (state) => ({
            ...state,
            isNavigatingBack: true
        }),

        [NAVIGATE_BACK_COMPLETE]: (state) => {
            const history = [...state.tabRoutes[state.activeTab]];
            
            history.pop();

            const updatedTabRoutes = state.tabRoutes.reduce((current, route, index) => [
              ...current,
              (index === state.activeTab ? history : route)
            ], [])

            if (config.adapter) {
                const currentRoute = history[history.length - 1];
                config.adapter.setRoute(currentRoute);
            }

            return {
                ...state,
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
        
        [SET_ACTIVE_TAB]: (state, {payload}) => {
        if (state.isNavigating || state.isNavigatingBack) {
          return state;
        }

        return {
          ...state,
          activeTab: payload,
          history: state.tabRoutes[payload]
        }
      }

    }, initialState);

};

export default routerReducer;