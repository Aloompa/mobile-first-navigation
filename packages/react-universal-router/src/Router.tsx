import * as React from 'react';

import { Animated, Dimensions, Easing, View } from 'react-native';
import { always, curry, defaultTo, equals, ifElse, negate, path } from 'ramda';
import { componentDidMount, componentDidUpdate } from 'react-functional-lifecycle';
import { compose, withProps, withState } from 'recompose';

import ComponentContainer from './components/ComponentContainer';
import ContentArea from './components/ContentArea';
import Wrapper from './components/Wrapper';
import TabRouter from './components/TabRouter';
import withRouter from './withRouter';

const getTitleFromCache = curry((props: any, currentRoute: any) => {
    const cacheKey = JSON.stringify(currentRoute);

    const dynamicTitle = path(['route', 'navigationTitle'], props)

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

            titleResponse.then(title => {
                props.setTitleCache({
                    ...props.titleCache,
                    [cacheKey]: title
                });
            });
        }
    }

    return '';
});

const getTitle = props => {
    if (!props.history.length) {
        return;
    }
    
    const history = props.history.filter(route => 
        props.routes[route.route] &&
        (props.routes[route.route].mode !== 'modal')
    );

    const currentRoute = history[
        history.length - (
            (history.length === props.history.length) && 
            props.isNavigatingBack ? 
                2 : 
                1
        )
    ];

    return getTitleFromCache(props, currentRoute);
};

const Router = (props: any) => (
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
            tabButtons={props.tabs && props.tabs.map((tab) => tab.button)}
            tabViews={props.tabRoutes.map(() => <ContentArea>
            {props.history.filter(route => {
                const routeConfig = props.routes[route.route];
                return routeConfig.mode !== 'modal';
            }).map((route, key) => {
                const routeConfig = props.routes[route.route];
                const { Component } = routeConfig;

                const bottom = 0;
                const right = routeConfig.positionAnimation[props.activeTabIndex];

                const AnimatedCmp = (right === 0 && bottom === 0) ? View : Animated.View;

                return (
                    <AnimatedCmp key={key} style={{
                        position: 'absolute',
                        right,
                        bottom,
                        width: '100%',
                        height: '100%'
                    }}>
                        <ComponentContainer style={{
                            backgroundColor: '#FFFFFF',
                            height: '100%'
                        }}>
                            {Component ? (
                                <Component {...props} route={route} />
                            ) : null}
                        </ComponentContainer>
                    </AnimatedCmp>
                );
            })}
        </ContentArea>)}
          />
        {props.history.filter(route => {
                const routeConfig = props.routes[route.route];
                return routeConfig.mode === 'modal';
            }).map((route, key) => {
              const routeConfig = props.routes[route.route];
                const { Component } = routeConfig;

                return (
                    <Animated.View key={key} style={{
                        position: 'absolute',
                        right: 0,
                        bottom: routeConfig.positionAnimation,
                        width: '100%',
                        height: '100%'
                    }}>
                        <ComponentContainer style={{
                            backgroundColor: '#FFFFFF',
                            height: '100%'
                        }}>
                            {props.renderTopNav({
                                ...props,
                                mode: 'modal',
                                height: props.topNavHeight,
                                routeTitle: getTitleFromCache(props, route)
                            })}
                            {Component ? (
                                <Component {...props} route={route} />
                            ) : null}
                        </ComponentContainer>
                    </Animated.View>
                );
            })}
    </Wrapper>
);

const getOffset = routeConfig => {
    const { height, width } = Dimensions.get('window');

    return ifElse(
        equals('modal'),
        always(height),
        always(width)
    )(routeConfig.mode);
};

const initializeRoutes = (routes, tabs) => {
    return Object.keys(routes).reduce((prev, key, index) => {
        const suppliedConfig = (routes[key] || {});
        const offset = getOffset(suppliedConfig);        
        let positionAnimation = (index ? new Animated.Value(negate(offset) || 0) : 0);
        if(routes[key].mode !== 'modal')
        {
          const tabIndexInitial = tabs.length > 1 ? tabs.findIndex(tab => tab.initial === key) : index;
          positionAnimation = Array(tabs.length).fill(0).map((_, index) => index === tabIndexInitial ? 0 : new Animated.Value(negate(offset) || 0));
        }

        const routeConfig = {
            Component: routes[key].route,
            ...suppliedConfig,
            positionAnimation
        };

        return {
            ...prev,
            [key]: routeConfig
        };
    }, {});
};

const doUpdate = (props, prevProps) => {

    // Push New Route
    if (props.history.length > prevProps.history.length) {
        const currentRoute = props.routes[props.route.route];
        const positionAnimation = currentRoute.mode === 'modal' ? currentRoute.positionAnimation : currentRoute.positionAnimation[props.activeTabIndex];
        return Animated.timing(positionAnimation, {
            toValue: 0,
            duration: 350,
            easing: Easing.out(Easing.exp)
        }).start(props.navigateComplete);
    }

    // Pop Current Route
    if (props.isNavigatingBack && !prevProps.isNavigatingBack) {
        const currentRoute = props.routes[props.route.route];
        const offset = getOffset(currentRoute);
        const positionAnimation = currentRoute.mode === 'modal' ? currentRoute.positionAnimation : currentRoute.positionAnimation[props.activeTabIndex];

        return Animated.timing(positionAnimation, {
            toValue: negate(offset),
            duration: 350,
            easing: Easing.out(Easing.exp)
        }).start(props.navigateBackComplete);
    }
};

const renderTopNav = always(null);

const setInitialPositions = props => {
    props.history.map(route => {
        const currentRoute = props.routes[route.route];
        const positionAnimation = currentRoute.mode === 'modal' ? currentRoute.positionAnimation : currentRoute.positionAnimation[props.activeTabIndex];

        if (typeof positionAnimation !== 'number') {
            Animated.timing(positionAnimation, {
                toValue: 0,
                duration: 0
            }).start();
        }
    });
};

const createRoutes = (config) => {

  Object.keys(config.routes).forEach(key => {
    if (!config.routes[key].getTitle || !config.routes[key].getTitle()) {
        config.routes[key] = {
            ...config.routes[key],
            getTitle: always(' ')
        };
    }
  });

  const tabs = defaultTo([{}], config.tabs);

  return compose(
        withRouter,
        withProps({
            topNavHeight: config.topNavHeight || 50,
            renderTopNav,
            ...config
        }),
        withState('routes', 'setRoutes', initializeRoutes(config.routes, tabs)),
        componentDidUpdate(doUpdate),
        componentDidMount(setInitialPositions)
    )(Router);
};

export default createRoutes;