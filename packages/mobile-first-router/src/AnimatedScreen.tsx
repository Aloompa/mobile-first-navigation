import * as React from 'react';

import { useSpring } from 'react-spring';
import { AnimatedView } from './AnimatedView';

import { ComponentContainer } from '@aloompa/mobile-first-components';
const config = { tension: 300, friction: 25, precision: 0.01, clamp: true };
const { useEffect } = React;
export const AnimatedScreen = (props: {
  Component: any;
  route: any;
  routes: Array<any>;
  history: any;
  isNavigatingBack: boolean;
  navigateBackComplete: Function;
  isNavigating: boolean;
  getTitleFromCache: Function;
  width: number;
  height: number;
  poppedRoute: string;
  modal: boolean;
  routeConfig: any;
  renderTopNav: Function;
  topNavHeight: number;
  routeToPop: string;
}) => {
  const Component = props.Component;
  const { isNavigating, width, isNavigatingBack, route, routeToPop } = props;
  const [spring, setSpring] = determineAnimationForScreenType({
    isNavigating,
    width
  });
  const lastRoute = props.history[props.history.length - 1].route;
  useEffect(() => {
    animateBackwardsNavigate({
      spring,
      setSpring,
      isNavigatingBack,
      width,
      lastRoute,
      route: route.route,
      routeToPop
    });
  }, [props.isNavigatingBack]);

  return (
    <AnimatedView
      key={props.poppedRoute || props.route}
      style={{
        height: '100%',
        ...spring,
        position: 'absolute',
        width: '100%'
      }}
    >
      <ComponentContainer
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%'
        }}
      >
        {props.modal &&
          props.renderTopNav({
            ...props,
            mode: 'modal',
            height: props.topNavHeight,
            routeTitle: props.getTitleFromCache(props, props.route)
          })}
        {Component ? <Component {...props} route={props.route} /> : null}
      </ComponentContainer>
    </AnimatedView>
  );
};

const determineAnimationForScreenType = (props: {
  isNavigating: boolean;
  width: number;
}) => {
  if (props.isNavigating) {
    return useSpring(() => ({
      to: async (next, _cancel) => {
        await next({ right: 0, config: { ...config } });
      },
      from: { right: -props.width }
    }));
  } else {
    return useSpring(() => ({
      right: 0,
      bottom: 0,
      config: { duration: 140 }
    }));
  }
};

const animateBackwardsNavigate = (props: {
  spring: any;
  isNavigatingBack: boolean;
  setSpring: any;
  width: number;
  lastRoute: string;
  route: string;
  routeToPop: string;
}) => {
  if (props.isNavigatingBack && props.lastRoute === props.route) {
    props.setSpring(() => ({
      reverse: true,
      reset: true
    }));
  }
};
