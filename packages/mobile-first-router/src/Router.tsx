import * as React from 'react';

import { always, compose, defaultTo } from 'ramda';

import {
  Wrapper,
  TabRouter,
  ContentArea,
  View
} from '@aloompa/mobile-first-components';

import withRouter from './withRouter';
import {
  MFNavigationConfig,
  MFNavigationRoute,
  MFNavigationRouteComponent
} from './MFNavigationTypes';
import { AnimatedModalScreen } from './AnimatedModalScreen';
import { AnimatedScreen } from './AnimatedScreen';
import { getWidthAndHeight } from './util/getWidthAndHeight';
import { getTitle, getTitleFromCache } from './util/getTitle';
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

  return (
    <Wrapper>
      {props.renderTopNav({
        ...props,
        mode: 'screen',
        height: props.topNavHeight,
        routeTitle: getTitle(props)
      })}
      <TabRouter
        activeTabIndex={props.activeTabIndex}
        setActiveTab={props.setActiveTab}
        bottomTab={true}
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

const createRoutes = (config: MFNavigationConfig) => {
  const configWithTitles = fillEmptyTitles(config);

  return compose(withRouter)((props) =>
    Router({
      ...props,
      ...{
        topNavHeight: defaultTo(50, configWithTitles.topNavHeight),
        renderTopNav,
        ...configWithTitles
      }
    })
  );
};

export default createRoutes;
