import * as React from 'react';

import { useSpring, animated } from 'react-spring';

import { ComponentContainer } from '@aloompa/mobile-first-components';
const { useEffect } = React;
export const AnimatedModalScreen = (props: {
  renderTopNav: Function;
  topNavHeight: number;
  getTitleFromCache: Function;
  route: any;
  Component: any;
  isNavigatingBack: boolean;
  history: any;
}) => {
  const Component = props.Component;

  const [spring, setSpring] = useSpring(() => ({
    to: async (next, _cancel) => {
      await next({ bottom: 0, config: { duration: 140 } });
    },
    from: { bottom: -414 }
  }));

  useEffect(() => {
    animateBackwardsNavigate({ ...props, spring, setSpring });
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
  setSpring: Function;
  history: any;
}) => {
  if (props.isNavigatingBack) {
    console.log(props);
    props.setSpring(() => ({
      to: async (next, _cancel) => {
        await next({ bottom: -414, config: { duration: 140 } });
      },
      from: { bottom: 0 }
    }));
  }
};
