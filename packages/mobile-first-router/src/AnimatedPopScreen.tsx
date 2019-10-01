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

  useEffect(() => {
    animateBackwardsNavigate({ ...props, spring, setSpring });
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
  isNavigatingBack: boolean;
  isNavigating: boolean;
  setSpring: Function;
  history: any;
  routes: any;
  poppedRoute: any;
  modal: boolean;
  height: number;
  width: number;
}) => {
  if (!props.isNavigatingBack && !props.isNavigating) {
    console.log(props.modal, 'PROPS.modal');
    props.modal
      ? null
      : // props.setSpring(() => ({
        //     to: async (next, _cancel) => {
        //       await next({ bottom: 0, zIndex: 100, config: { duration: 0 } });
        //       await next({ bottom: -props.height, config: { duration: 800 } });
        //       await next({ bottom: 0, zIndex: -100, config: { duration: 0 } });
        //     },
        //     from: { zIndex: -100, bottom: 0 }
        //   }))
        props.setSpring(() => ({
          to: async (next, _cancel) => {
            await next({ zIndex: 100, right: 0, config: { duration: 0 } });
            await next({ right: -props.width, config: { duration: 100 } });
            await next({ zIndex: -100, config: { duration: 0 } });
          }
        }));
  }
};

// async (next, _cancel) =>  {
//   await next({ right: 0, zIndex: 100, config: { duration: 0 } });
//   await next({ right: 0, height: -props.height, config: { duration: 140 } });
//   await next({ zIndex: -100, bottom: 0, config: { duration: 0 } });
// }
