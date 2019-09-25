import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TabButton, TopNav } from '@aloompa/mobile-first-components';

storiesOf('TabButton', module).add('unselected', () => (
  <TabButton
    selected={false}
    iconUnselectedColor={'#ccc'}
    iconHeight={18}
    iconWidth={20}
    iconSelectedColor={'#FF00FF'}
    title={'Browse'}
    iconUrl={
      'https://s3.amazonaws.com/assets.aloompa.com/TestFolder/reservations-tab-icon-browse.svg'
    }
  />
));

storiesOf('TabButton', module).add('selected', () => (
  <TabButton
    selected={true}
    iconUnselectedColor={'#ccc'}
    iconHeight={18}
    iconWidth={20}
    iconSelectedColor={'#FF00FF'}
    title={'Browse'}
    iconUrl={
      'https://s3.amazonaws.com/assets.aloompa.com/TestFolder/reservations-tab-icon-browse.svg'
    }
  />
));

storiesOf('TopNav', module).add('with navigation', () => (
  <TopNav history={[]} routeTitle={'Navigation Title'} navigatBack={() => {}} />
));

storiesOf('TopNav', module).add('with modal', () => (
  <TopNav
    history={[]}
    routeTitle={'Navigation Title'}
    navigatBack={() => {}}
    mode={'modal'}
  />
));
