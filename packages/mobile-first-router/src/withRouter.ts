import routerReducer from './routerReducer';
import { useReducer } from 'react';
import { MFNavigationConfig } from './MFNavigationTypes';

const createActions = (actions: Array<string>, dispatch: Function) =>
  actions.reduce((prev, curr) => {
    return { ...prev, curr: (payload) => dispatch({ type: curr, payload }) };
  }, {});

const withRouter = (config: MFNavigationConfig) => {
  const { reducer, initialState } = routerReducer(config);
  const actions = Object.keys(reducer);
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    ...state,
    ...createActions(actions, dispatch)
  };
};

export default withRouter;
