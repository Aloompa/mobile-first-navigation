import * as React from 'react';

import { always, defaultTo } from 'ramda';

import {
  Wrapper,
  TabRouter,
  ContentArea,
  View
} from '@aloompa/mobile-first-components';

import {
  MFNavigationConfig,
  MFNavigationRoute,
  MFNavigationRouteComponent
} from './MFNavigationTypes';
import { AnimatedModalScreen } from './AnimatedModalScreen';
import { AnimatedScreen } from './AnimatedScreen';
import { getWidthAndHeight } from './util/getWidthAndHeight';
import { getTitle, getTitleFromCache } from './util/getTitle';
import { routerReducer } from '.';
const { useState, useEffect } = React;

const Router = (props: any) => {
  const [routeConfigs] = useState(initializeRoutes(props.routes));

  const { width, height } = getWidthAndHeight(props);

  useEffect(() => {
    pushNewRoute({ ...props });
  }, [props.history.length]);

  useEffect(() => {
    popCurrentRoute({ ...props });
  }, [props.isNavigatingBack]);

  const poppedRoute = props.poppedRoute.route;
  const currentRouteId = props.route.route;
  const currentRouteConfig = routeConfigs[currentRouteId];

  return (
    <Wrapper>
      {props.renderTopNav({
        ...props,
        mode: 'screen',
        height: props.topNavHeight,
        routeTitle: getTitle(props)
      })}
      <TabRouter
        hideTabBar={currentRouteConfig.hideTabBar}
        activeTabIndex={props.activeTabIndex}
        setActiveTab={props.setActiveTab}
        bottomTab={!props.topTab}
        viewHeightReduction={props.tabRoutes.length > 1 ? 102 : 50}
        tabButtons={props.tabs ? props.tabs.map((tab) => tab.button) : []}
        tabViews={props.tabRoutes.map(() => (
          <ContentArea>
            {props.history
              .filter((route) => {
                const routeConfig = routeConfigs[route.route];
                return routeConfig.mode !== 'modal';
              })
              .map((route, _index) => {
                const routeConfig = routeConfigs[route.route];
                const { Component } = routeConfig;
                return (
                  <View>
                    <AnimatedScreen
                      {...{
                        ...props,
                        width,
                        Component,
                        poppedRoute,
                        route
                      }}
                    />
                  </View>
                );
              })}
          </ContentArea>
        ))}
      />
      {props.history
        .filter((route) => {
          const routeConfig = routeConfigs[route.route];
          return routeConfig.mode === 'modal';
        })
        .map((route, _key) => {
          const routeConfig = routeConfigs[route.route];
          const { Component } = routeConfig;
          return (
            <View>
              <AnimatedModalScreen
                {...{
                  ...props,
                  height,
                  Component,
                  getTitleFromCache,
                  route,
                  renderTopNav: props.renderTopNav
                }}
              />
            </View>
          );
        })}
    </Wrapper>
  );
};

const initializeRoutes = (routes: Array<MFNavigationRoute>) => {
  const routesWithComponents = Object.keys(routes).reduce((prev, key) => {
    const suppliedConfig = routes[key] || {};

    const routeConfig = {
      Component: routes[key].route,
      ...suppliedConfig
    };

    return {
      ...prev,
      [key]: routeConfig
    };
  }, {}) as Array<MFNavigationRouteComponent>;
  return routesWithComponents;
};

const pushNewRoute = (props) => {
  if (props.history.length > 1 && props.isNavigating) {
    return props.navigateComplete();
  } else {
    return;
  }
};

const popCurrentRoute = (props) => {
  if (props.history.length > 1 && props.isNavigatingBack) {
    return setTimeout(() => props.navigateBackComplete(), 140);
  } else {
    return;
  }
};

const renderTopNav = always(null);

const fillEmptyTitles = (config: MFNavigationConfig) =>
  defaultTo(
    config,
    Object.keys(config.routes).reduce(
      (total, key) => {
        if (!config.routes[key].getTitle || !config.routes[key].getTitle()) {
          return {
            ...total,
            routes: {
              ...total.routes,
              [key]: {
                ...config.routes[key],
                getTitle: always(' ')
              }
            }
          };
        } else {
          return {
            ...total,
            routes: {
              ...total.routes,
              [key]: { ...config.routes[key] }
            }
          };
        }
      },
      { ...config, routes: {} }
    )
  );

const createActions = (actions: Array<string>, dispatch: Function) =>
  actions.reduce((prev, curr) => {
    return { ...prev, curr: (payload) => dispatch({ type: curr, payload }) };
  }, {});

const createRoutes = (config: MFNavigationConfig) => {
  const { reducer, initialState } = routerReducer(config);

  return (props) => {
    const configWithTitles = fillEmptyTitles(config);
    const actions = Object.keys(reducer);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    console.log(state, ':::STATE');
    const newProps = {
      ...state,
      ...createActions(actions, dispatch)
    };
    console.log(
      props,
      newProps,
      {
        topNavHeight: defaultTo(50, configWithTitles.topNavHeight),
        renderTopNav,
        ...configWithTitles
      },
      'PROPS'
    );
    return Router({
      ...props,
      ...newProps,
      ...{
        topNavHeight: defaultTo(50, configWithTitles.topNavHeight),
        renderTopNav,
        ...configWithTitles
      }
    });
  };
};

export const createStoreAndRoutes = (config: MFNavigationConfig) => {
  const Routes = createRoutes(config);
  return (props) => <Routes {...props}>{props.children}</Routes>;
};

export default createStoreAndRoutes;
