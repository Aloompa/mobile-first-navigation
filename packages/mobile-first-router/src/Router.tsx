import * as React from 'react';

import { always, curry, path, compose, defaultTo } from 'ramda';

import {
  Wrapper,
  TabRouter,
  ContentArea
} from '@aloompa/mobile-first-components';

import withRouter from './withRouter';
import { MFNConfig } from './MFNTypes';
import { AnimatedModalScreen } from './AnimatedModalScreen';
import { AnimatedScreen } from './AnimatedScreen';

const { useState, useEffect } = React;

const getTitleFromCache = curry((props: any, currentRoute: any) => {
  const cacheKey = JSON.stringify(currentRoute);

  const dynamicTitle = path(['route', 'navigationTitle'], props);

  if (dynamicTitle) {
    return dynamicTitle;
  }

  if (props.titleCache[cacheKey]) {
    return props.titleCache[cacheKey];
  }

  const currentRouteConfig = props.routes[currentRoute.route];

  if (currentRouteConfig.getTitle) {
    const titleResponse = currentRouteConfig.getTitle({
      ...props,
      route: currentRoute
    });

    // Set the title syncronously
    if (typeof titleResponse === 'string') {
      props.setTitleCache({
        ...props.titleCache,
        [cacheKey]: titleResponse
      });
      // Set the title asyncronously
    } else {
      props.setTitleCache({
        ...props.titleCache,
        [cacheKey]: true
      });

      titleResponse.then((title) => {
        props.setTitleCache({
          ...props.titleCache,
          [cacheKey]: title
        });
      });
    }
  }

  return '';
});

const getTitle = (props) => {
  if (!props.history.length) {
    return;
  }

  const history = props.history.filter(
    (route) =>
      props.routes[route.route] && props.routes[route.route].mode !== 'modal'
  );

  const currentRoute =
    history[
      history.length -
        (history.length === props.history.length && props.isNavigatingBack
          ? 2
          : 1)
    ];

  return getTitleFromCache(props, currentRoute);
};

const Router = (props: any) => {
  const [routes] = useState(initializeRoutes(props.routes));

  useEffect(() => {
    pushNewRoute({ ...props, routes });
  }, [props.history.length]);

  useEffect(() => {
    popCurrentRoute({ ...props, routes });
  }, [props.isNavigatingBack]);

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
        viewHeightReduction={102}
        tabButtons={props.tabs ? props.tabs.map((tab) => tab.button) : []}
        tabViews={props.tabRoutes.map(() => (
          <ContentArea>
            {props.history
              .filter((route) => {
                const routeConfig = routes[route.route];
                return routeConfig.mode !== 'modal';
              })
              .map((route, _index) => {
                const routeConfig = routes[route.route];
                const { Component } = routeConfig;
                return <AnimatedScreen {...{ ...props, Component, route }} />;
              })}
          </ContentArea>
        ))}
      />
      {props.history
        .filter((route) => {
          const routeConfig = routes[route.route];
          return routeConfig.mode === 'modal';
        })
        .map((route, _key) => {
          const routeConfig = routes[route.route];
          const { Component } = routeConfig;
          return (
            <AnimatedModalScreen
              {...{
                ...props,
                Component,
                getTitleFromCache,
                route,
                renderTopNav: props.renderTopNav
              }}
            />
          );
        })}
    </Wrapper>
  );
};

const initializeRoutes = (routes) => {
  return Object.keys(routes).reduce((prev, key) => {
    const suppliedConfig = routes[key] || {};

    const routeConfig = {
      Component: routes[key].route,
      ...suppliedConfig
    };

    return {
      ...prev,
      [key]: routeConfig
    };
  }, {});
};

const pushNewRoute = (props) => {
  if (props.history.length > 1) {
    return props.navigateComplete();
  }
};

const popCurrentRoute = (props) => {
  if (props.history.length > 1 && props.isNavigatingBack) {
    return props.navigateBackComplete();
  }
};

const renderTopNav = always(null);

const fillEmptyTitles = (config: MFNConfig) =>
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

const createRoutes = (config: MFNConfig) => {
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
