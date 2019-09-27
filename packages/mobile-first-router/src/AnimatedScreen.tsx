import * as React from 'react';

import { useSpring, animated } from 'react-spring';

import { ComponentContainer } from '@aloompa/mobile-first-components';

export const AnimatedScreen = (props: { Component: any; route: any }) => {
  const Component = props.Component;
  const spring = useSpring({ right: 0 });
  return (
    <animated.div
      //   key={index}
      style={{
        ...spring,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <ComponentContainer
        // key={index}
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%',
          //   right,
          bottom: 0
        }}
      >
        {props.Component ? <Component {...props} route={props.route} /> : null}
      </ComponentContainer>
    </animated.div>
  );
};
