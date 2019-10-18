import { combineReducers } from 'redux';
import { createStore } from 'redux';
import queryStringAdapter from './adapters/queryStringAdapter';
import routerReducer from './routerReducer';
import { MFNavigationConfig } from './MFNavigationTypes';

const combinedReducers = (routeConfig: MFNavigationConfig) =>
  combineReducers({
    router: routerReducer({
      routeConfig,
      adapter: queryStringAdapter
    })
  });

const store = (routeConfig: MFNavigationConfig) =>
  createStore(combinedReducers(routeConfig));

export default store;
