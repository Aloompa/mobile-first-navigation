import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { TabRouter, TabButton, TopNav } from '@aloompa/mobile-first-components';

storiesOf('TabButton', module)
  .add('unselected', () => (
    <TabButton
      selected={false}
      iconUnselectedColor={'#ccc'}
      iconHeight={18}
      iconWidth={20}
      iconSelectedColor={'#FF00FF'}
      title={'Browse'}
      onPress={linkTo('TabButton', 'selected')}
      iconUrl={
        'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-browse.svg'
      }
    />
  ))
  .add('selected', () => (
    <TabButton
      selected={true}
      iconUnselectedColor={'#ccc'}
      iconHeight={18}
      iconWidth={20}
      iconSelectedColor={'#FF00FF'}
      title={'Browse'}
      iconUrl={
        'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-browse.svg'
      }
    />
  ));

storiesOf('TopNav', module)
  .add('at initial route', () => (
    <TopNav history={['home']} routeTitle={'Home'} navigateBack={() => {}} />
  ))
  .add('with history', () => (
    <TopNav
      history={['home', 'other']}
      routeTitle={'Other Page'}
      navigateBack={linkTo('TopNav', 'at initial route')}
    />
  ))
  .add('with modal', () => (
    <TopNav
      history={[]}
      routeTitle={'Modal Title'}
      navigateBack={linkTo('TopNav', 'with history')}
      mode={'modal'}
    />
  ));

const tabViews = [
  <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
    <span>Browsing..</span>
  </div>,
  <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
    <span>Tickets?</span>
  </div>,
  <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
    <span>Profile!</span>
  </div>
];

const tabConfigA = (nTabs) => ({
  iconUnselectedColor: '#ccc',
  iconHeight: 18,
  iconWidth: 20,
  iconSelectedColor: '#000',
  iconUrl:
    'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-browse.svg',
  onPress: linkTo(`TabBar/${nTabs} Tabs`, 'first selected'),
  title: 'Browse'
});

const tabConfigB = (nTabs) => ({
  iconUnselectedColor: '#ccc',
  iconHeight: 18,
  iconWidth: 22,
  iconSelectedColor: '#000',
  iconUrl:
    'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-tickets.svg',
  onPress: linkTo(`TabBar/${nTabs} Tabs`, 'second selected'),
  title: 'Tickets'
});

const twoTabButtons = [tabConfigA, tabConfigB].map(
  (config) => (selected, _onPress) => (
    <TabButton {...config('Two')} selected={selected} />
  )
);

storiesOf('TabBar/Two Tabs', module)
  .add('first selected', () => (
    <TabRouter
      activeTabIndex={0}
      setActiveTab={() => {}}
      bottomTab={true}
      tabViews={tabViews}
      viewHeightReduction={102}
      tabButtons={twoTabButtons}
    />
  ))
  .add('second selected', () => (
    <TabRouter
      activeTabIndex={1}
      setActiveTab={() => {}}
      bottomTab={true}
      tabViews={tabViews}
      viewHeightReduction={102}
      tabButtons={twoTabButtons}
    />
  ));

const tabConfigC = (nTabs) => ({
  iconUnselectedColor: '#ccc',
  iconHeight: 22,
  iconWidth: 22,
  iconSelectedColor: '#000',
  iconUrl:
    'https://aloompa-assets.imgix.net/TestFolder/reservations-tab-icon-account.svg',
  onPress: linkTo(`TabBar/${nTabs} Tabs`, 'third selected'),
  title: 'Profile'
});

const threeTabButtons = [tabConfigA, tabConfigB, tabConfigC].map(
  (config) => (selected, _onPress) => (
    <TabButton {...config('Three')} selected={selected} />
  )
);

storiesOf('TabBar/Three Tabs', module)
  .add('first selected', () => (
    <TabRouter
      activeTabIndex={0}
      setActiveTab={() => {}}
      bottomTab={true}
      tabViews={tabViews}
      viewHeightReduction={102}
      tabButtons={threeTabButtons}
    />
  ))
  .add('second selected', () => (
    <TabRouter
      activeTabIndex={1}
      setActiveTab={() => {}}
      bottomTab={true}
      tabViews={tabViews}
      viewHeightReduction={102}
      tabButtons={threeTabButtons}
    />
  ))
  .add('third selected', () => (
    <TabRouter
      activeTabIndex={2}
      setActiveTab={() => {}}
      bottomTab={true}
      tabViews={tabViews}
      viewHeightReduction={102}
      tabButtons={threeTabButtons}
    />
  ));
