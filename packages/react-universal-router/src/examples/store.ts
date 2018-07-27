import { combineReducers } from 'redux';
import { createStore } from 'redux';
import queryStringAdapter from '../adapters/queryStringAdapter';
import { routerReducer } from '../index';

const combinedReducers = combineReducers({
    router: routerReducer({
        initialRoute: 'Home',
        adapter: queryStringAdapter
    })
});

const store = createStore(combinedReducers);

export default store; 