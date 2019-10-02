import * as React from 'react';

import { useSpring } from 'react-spring';
import { AnimatedView } from './AnimatedView';
import { ComponentContainer } from '@aloompa/mobile-first-components';
import { MFNHistoryRoute } from './MFNTypes';

const { useEffect } = React;

const config = { tension: 400, friction: 40, clamp: true };

export const AnimatedModalScreen = (props: {
  renderTopNav: Function;
  topNavHeight: number;
  getTitleFromCache: Function;
  route: MFNHistoryRoute;
  Component: any;
  height: number;
  isNavigatingBack: boolean;
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
    <AnimatedView
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
    </AnimatedView>
  );
};

const animateBackwardsNavigate = (props: {
  spring: any;
  isNavigatingBack: boolean;
  setSpring: any;
  height: number;
}) => {
  if (props.isNavigatingBack) {
    props.setSpring(() => ({
      reverse: true,
      reset: true
    }));
  }
};
