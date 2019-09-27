import * as React from 'react';

import { useSpring, animated } from 'react-spring';

import { ComponentContainer } from '@aloompa/mobile-first-components';

export const AnimatedScreen = (props: {
  Component: any;
  route: any;
  history: any;
  isNavigatingBack: any;
}) => {
  const Component = props.Component;
  console.log(props.history, 'HISTORY', props.isNavigatingBack);

  const spring =
    props.history.length > 1
      ? useSpring({
          to: async (next, _cancel) => {
            await next({ right: 0 });
          },
          from: { right: -414 }
        })
      : useSpring({ right: 0 });
  console.log(props.route, 'this route?');
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
        {props.Component ? <Component {...props} route={props.route} /> : null}
      </ComponentContainer>
    </animated.div>
  );
};
