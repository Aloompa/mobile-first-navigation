import * as React from 'react';

import { useSpring, animated } from 'react-spring';
import { ComponentContainer, View } from '@aloompa/mobile-first-components';

const { useEffect } = React;

export const AnimatedScreen = (props: {
  Component: any;
  route: any;
  routes: Array<any>;
  history: any;
  isNavigatingBack: boolean;
  LastComponent: any;
  lastRoute: any;
  isNavigating: boolean;
  routeConfig: any;
}) => {
  console.log(props);
  const Component = props.Component;
  const LastComponent = props.LastComponent;
  const [spring, setSpring] =
    props.isNavigating && !props.isNavigatingBack
      ? useSpring(() => ({
          to: async (next, _cancel) => {
            await next({ right: 0, config: { duration: 140 } });
          },
          from: { right: -414 }
        }))
      : useSpring(() => ({ right: 0, config: { duration: 140 } }));

  useEffect(() => {
    animateBackwardsNavigate({ ...props, spring, setSpring });
  }, [props.isNavigatingBack]);

  return (
    <View>
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
      <animated.div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: -100
        }}
      >
        <ComponentContainer
          style={{
            backgroundColor: '#FFFFFF',
            height: '100%',
            bottom: 0
          }}
        >
          {LastComponent ? (
            <LastComponent {...props} route={props.lastRoute} />
          ) : null}
        </ComponentContainer>
      </animated.div>
    </View>
  );
};

const animateBackwardsNavigate = (props: {
  spring: any;
  isNavigatingBack: boolean;
  isNavigating: boolean;
  setSpring: Function;
  history: any;
}) => {
  if (props.history.length > 0 && props.isNavigatingBack) {
    console.log(props);
    props.setSpring(() => ({
      to: async (next, _cancel) => {
        await next({ right: 0, config: { duration: 0 } });
        await next({ right: 414, config: { duration: 120 } });
        await next({ right: 0, config: { duration: 0 } });
      }
    }));
  }
};
