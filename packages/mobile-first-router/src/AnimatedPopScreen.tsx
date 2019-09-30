import * as React from 'react';

import { useSpring, animated } from 'react-spring';
import { ComponentContainer } from '@aloompa/mobile-first-components';

const { useEffect } = React;

export const AnimatedPopScreen = (props: {
  Component: any;
  route: any;
  routes: Array<any>;
  history: any;
  isNavigatingBack: boolean;
  navigateBackComplete: Function;
  isNavigating: boolean;
  width: number;
  routeConfig: any;
  poppedRoute: any;
}) => {
  const Component = props.Component;
  const [spring, setSpring] = useSpring(() => ({ right: 0, zIndex: -100 }));

  useEffect(() => {
    animateBackwardsNavigate({ ...props, spring, setSpring });
  }, [props.isNavigatingBack]);

  console.log(Component, 'CMP');
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

const animateBackwardsNavigate = (props: {
  spring: any;
  isNavigatingBack: boolean;
  isNavigating: boolean;
  setSpring: Function;
  history: any;
  routes: any;
  poppedRoute: any;
}) => {
  if (props.isNavigatingBack) {
    console.log(props);
    props.setSpring(() => ({
      to: async (next, _cancel) => {
        await next({ zIndex: 100, right: 0, config: { duration: 0 } });
        await next({ right: -414, config: { duration: 100 } });
        await next({ zIndex: -100, config: { duration: 0 } });

        // await next({  zIndex: -100, right: 0, config: { duration: 0 } });
      }
    }));
  }
};
