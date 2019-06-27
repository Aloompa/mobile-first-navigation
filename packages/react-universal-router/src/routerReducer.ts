import { createActions, handleActions } from 'redux-actions';

import { last } from 'ramda';

const SET_ROUTE = 'SET_ROUTE';
const NAVIGATE_COMPLETE = 'NAVIGATE_COMPLETE';
const NAVIGATE_BACK = 'NAVIGATE_BACK';
const NAVIGATE_BACK_COMPLETE = 'NAVIGATE_BACK_COMPLETE';
const SET_TITLE_CACHE = 'SET_TITLE_CACHE';
const RESET_NAVIGATION = 'RESET_NAVIGATION';

export const { 
    setRoute,
    navigateComplete,
    navigateBack,
    navigateBackComplete,
    setTitleCache,
    resetNavigation
} = createActions({}, SET_ROUTE, NAVIGATE_COMPLETE, NAVIGATE_BACK, NAVIGATE_BACK_COMPLETE, SET_TITLE_CACHE, RESET_NAVIGATION);

const routerReducer = (config: {
    initialRoute: string,
    adapter?: {
        getRoute: Function,
        setRoute: Function
    }
}) => {

    const initialRoute = {
        route: config.initialRoute
    };

    const historyState = (config.adapter) ? 
        [initialRoute, ...config.adapter.getRoute(config.initialRoute)] :
        [initialRoute];

    const initialState = {
        isNavigating: false,
        destinations: [],
        isNavigatingBack: false,
        titleCache: {},
        history: historyState
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

            if (config.adapter) {
                config.adapter.setRoute(payload);
            }
            
            return {
                ...state,
                isNavigating: true,
                history,
                destinations: [payload]
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
            isNavigatingBack: true
        }),

        [NAVIGATE_BACK]: (state) => ({
            ...state,
            isNavigatingBack: true
        }),

        [NAVIGATE_BACK_COMPLETE]: (state) => {
            const history = [...state.history];
            
            history.pop();

            if (config.adapter) {
                const currentRoute = history[history.length - 1];
                config.adapter.setRoute(currentRoute);
            }

            return {
                ...state,
                isNavigatingBack: false,
                history: history.slice()
            };
        },

        [SET_TITLE_CACHE]: (state, { payload }) => ({
            ...state,
            titleCache: {
                ...state.titleCache,
                ...payload
            }
        })
        
    }, initialState);

};

export default routerReducer;