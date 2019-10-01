import * as React from 'react';

import { useSpring, animated } from 'react-spring';

import { ComponentContainer } from '@aloompa/mobile-first-components';

const { useEffect } = React;

const config = { tension: 200, friction: 25 };

export const AnimatedModalScreen = (props: {
  renderTopNav: Function;
  topNavHeight: number;
  getTitleFromCache: Function;
  route: any;
  Component: any;
  height: number;
  width: number;
  isNavigatingBack: boolean;
  isNavigating: boolean;
  history: any;
}) => {
  const Component = props.Component;

  const { isNavigatingBack, height } = props;

  const [spring, setSpring] = useSpring(() => ({
    to: async (next, _cancel) => {
      await next({ bottom: 0, config: { ...config } });
    },
    from: { bottom: -props.height }
  }));

  useEffect(() => {
    animateBackwardsNavigate({ spring, setSpring, isNavigatingBack, height });
  }, [props.isNavigatingBack]);

  return (
    <animated.div
      style={{
        ...spring,
        position: 'absolute',
        right: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <ComponentContainer
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%',
          right: 0
        }}
      >
        {props.renderTopNav({
          ...props,
          mode: 'modal',
          height: props.topNavHeight,
          routeTitle: props.getTitleFromCache(props, props.route)
        })}
        {Component ? <Component {...props} route={props.route} /> : null}
      </ComponentContainer>
    </animated.div>
  );
};

const animateBackwardsNavigate = (props: {
  spring: any;
  isNavigatingBack: boolean;
  setSpring: any;
  height: number;
}) => {
  if (props.isNavigatingBack) {
    console.log('here');
    props.setSpring(() => ({
      reverse: true,
      reset: true
    }));
  }
};
