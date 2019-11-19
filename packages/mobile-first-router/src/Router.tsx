import * as React from 'react';

import { always, defaultTo, path, pick } from 'ramda';

import {
  Wrapper,
  TabRouter,
  ContentArea,
  View
} from '@aloompa/mobile-first-components';

import queryStringAdapter, {
  getQueryString
} from './adapters/queryStringAdapter';

import {
  MFNavigationConfig,
  MFNavigationRoute,
  MFNavigationRouteComponent
} from './MFNavigationTypes';
import { AnimatedModalScreen } from './AnimatedModalScreen';
import { AnimatedScreen } from './AnimatedScreen';
import { getWidthAndHeight } from './util/getWidthAndHeight';
import { getTitle, getTitleFromCache } from './util/getTitle';
import {
  createActions as createReducerActions,
  routerReducer
} from './routerReducer';
const { useState, useEffect } = React;

const calcViewHeightReduction = ({
  navbarHidden,
  tabRoutes,
  isIOS,
  isAndroid
}: {
  navbarHidden: boolean;
  tabRoutes: Array<any>;
  isIOS: boolean;
  isAndroid: boolean;
}) => {
  if (tabRoutes.length > 1) {
    if (isIOS && navbarHidden) {
      return 85;
    } else if (isIOS) {
      return 135;
    }

    if (isAndroid && navbarHidden) {
      return 108;
    } else if (isAndroid) {
      return 158;
    }

    return 102;
  } else {
    return 50;
  }
};

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

  const queryState = getQueryString(
    path(['document', 'location', 'search'], global)
  );
  const { deviceType, isNative } = pick(['deviceType', 'isNative'], queryState);
  const isIOS = isNative === 'true' && deviceType === 'ios';
  const isAndroid = isNative == 'true' && deviceType === 'android';

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
        isIOS={isIOS}
        viewHeightReduction={calcViewHeightReduction({
          ...props,
          isIOS,
          isAndroid
        })}
        tabButtons={props.tabs ? props.tabs.map((tab) => tab.button) : []}
        tabViews={props.tabRoutes.map((_, key) => (
          <ContentArea key={key}>
            {props.history
              .filter((route) => {
                const routeConfig = routeConfigs[route.route];
                return routeConfig.mode !== 'modal';
              })
              .map((route, key) => {
                const routeConfig = routeConfigs[route.route];
                const { Component } = routeConfig;
                return (
                  <View key={key}>
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
        .map((route, key) => {
          const routeConfig = routeConfigs[route.route];
          const { Component } = routeConfig;
          return (
            <View key={key}>
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

const createRoutes = (config: MFNavigationConfig) => {
  const configWithTitles = fillEmptyTitles(config);
  const { reducer, initialState } = routerReducer({
    routeConfig: configWithTitles,
    adapter: queryStringAdapter
  });

  return (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const reducerActions = createReducerActions(dispatch);

    return Router({
      ...reducerActions,
      ...state,
      ...props,
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
  return (props) => {
    return <Routes {...props} />;
  };
};

export default createStoreAndRoutes;
