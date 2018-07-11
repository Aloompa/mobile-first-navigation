import { createActions, handleActions } from 'redux-actions';

const SET_ROUTE = 'SET_ROUTE';
const NAVIGATE_BACK = 'NAVIGATE_BACK';
const NAVIGATE_BACK_COMPLETE = 'NAVIGATE_BACK_COMPLETE';
const SET_TITLE_CACHE = 'SET_TITLE_CACHE';

export const { 
    setRoute,
    navigateBack,
    navigateBackComplete,
    setTitleCache
} = createActions({}, SET_ROUTE, NAVIGATE_BACK, NAVIGATE_BACK_COMPLETE, SET_TITLE_CACHE);

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
        isNavigatingBack: false,
        titleCache: {},
        history: historyState
    };

    return handleActions({

        [SET_ROUTE]: (state, { payload }) => {
            const history = [...state.history, payload];

            if (config.adapter) {
                config.adapter.setRoute(payload);
            }

            return {
                ...state,
                history
            };
        },

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