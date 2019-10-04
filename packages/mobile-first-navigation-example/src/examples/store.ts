import { combineReducers } from 'redux';
import { createStore } from 'redux';
import queryStringAdapter from '../adapters/queryStringAdapter';
import { routerReducer } from '@aloompa/mobile-first-router/lib';
import { routeConfig } from './Routes';

const combinedReducers = combineReducers({
  router: routerReducer({
    routeConfig,
    adapter: queryStringAdapter
  })
});

const store = createStore(combinedReducers);

export default store;
