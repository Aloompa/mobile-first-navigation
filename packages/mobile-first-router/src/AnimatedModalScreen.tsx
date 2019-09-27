import * as React from 'react';

import { useSpring, animated } from 'react-spring';

import { ComponentContainer } from '@aloompa/mobile-first-components';

// import withRouter from './withRouter';
// import { MFNConfig } from './MFNTypes';

export const AnimatedModalScreen = (props: {
  renderTopNav: Function;
  topNavHeight: number;
  getTitleFromCache: Function;
  route: any;
  Component: any;
  // modalSpring: any
}) => {
  const Component = props.Component;
  const modalSpring = useSpring({ bottom: 0 });

  return (
    <animated.div
      // key={key}
      style={{
        ...modalSpring,
        position: 'absolute',
        right: 0,
        // bottom: routeConfig.positionAnimation,
        width: '100%',
        height: '100%'
      }}
    >
      <ComponentContainer
        //   key={key}
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%',
          right: 0
          // bottom: routeConfig.positionAnimation,
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
