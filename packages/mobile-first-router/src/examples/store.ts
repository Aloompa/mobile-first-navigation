import { combineReducers } from 'redux';
import { createStore } from 'redux';
import queryStringAdapter from '../adapters/queryStringAdapter';
import { routerReducer } from '../index';
import { routeConfig } from './Routes';

const combinedReducers = combineReducers({
  router: routerReducer({
    routeConfig,
    adapter: queryStringAdapter
  })
});

const store = createStore(combinedReducers);

export default store;
