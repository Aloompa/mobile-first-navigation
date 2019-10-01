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
  modal: boolean;
  height: number;
}) => {
  const Component = props.Component;
  const [spring, setSpring] = useSpring(() => ({
    right: 0,
    bottom: 0,
    zIndex: -100
  }));

  const { isNavigatingBack, isNavigating, modal, width } = props;

  useEffect(() => {
    animateBackwardsNavigate({
      spring,
      setSpring,
      isNavigatingBack,
      isNavigating,
      modal,
      width
    });
  }, [props.isNavigatingBack]);

  return (
    <animated.div
      key={props.poppedRoute}
      style={{
        ...spring,
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
      <ComponentContainer
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%'
        }}
      >
        {Component ? <Component {...props} route={props.route} /> : null}
      </ComponentContainer>
    </animated.div>
  );
};

const animateBackwardsNavigate = (props: {
  spring: any;
  setSpring: any;
  isNavigatingBack: boolean;
  isNavigating: boolean;
  modal: boolean;
  width: number;
}) => {
  if (!props.isNavigatingBack && !props.isNavigating) {
    props.modal
      ? null
      : props.setSpring(() => ({
          to: async (next, _cancel) => {
            await next({ zIndex: 100, right: 0, config: { duration: 0 } });
            await next({ right: -props.width, config: { duration: 150 } });
            await next({ zIndex: -100, config: { duration: 0 } });
          }
        }));
  }
};
