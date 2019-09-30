import * as React from 'react';

import { useSpring, animated } from 'react-spring';
import { ComponentContainer } from '@aloompa/mobile-first-components';

export const AnimatedScreen = (props: {
  Component: any;
  route: any;
  routes: Array<any>;
  history: any;
  isNavigatingBack: boolean;
  navigateBackComplete: Function;
  isNavigating: boolean;
  width: number;
  routeConfig: any;
}) => {
  const Component = props.Component;
  const [spring] =
    props.isNavigating && !props.isNavigatingBack
      ? useSpring(() => ({
          to: async (next, _cancel) => {
            await next({ right: 0, config: { duration: 140 } });
          },
          from: { right: -props.width }
        }))
      : useSpring(() => ({ right: 0, config: { duration: 140 } }));
  return (
    <animated.div
      style={{
        ...spring,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <ComponentContainer
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%',
          bottom: 0
        }}
      >
        {Component ? <Component {...props} route={props.route} /> : null}
      </ComponentContainer>
    </animated.div>
  );
};
