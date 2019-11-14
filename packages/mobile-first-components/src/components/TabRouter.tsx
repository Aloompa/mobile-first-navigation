import * as React from 'react';
import { View } from './Primitives';

const TabRouter = (props: {
  hideTabBar: boolean;
  activeTabIndex: number;
  setActiveTab: any;
  bottomTab: boolean;
  tabButtons: any[];
  tabViews: any[];
  viewHeightReduction: number;
  isIOS: boolean;
}) => {
  const tabBar = (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 52,
        [`border${props.bottomTab ? 'Top' : 'Bottom'}`]: '1px solid #BBBBBB'
      }}
      key={'tab-bar'}
    >
      {props.tabButtons.map((button, index) => (
        <React.Fragment key={index}>
          {button(props.activeTabIndex === index, () =>
            props.setActiveTab(index)
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const viewHeightReduction =
    props.viewHeightReduction -
    (props.hideTabBar ? (props.isIOS ? 63 : 52) : 0);
  const tabView = (
    <View
      style={{ height: `Calc(100vh - ${viewHeightReduction}px` }}
      key={'tab-view'}
    >
      {props.tabViews[props.activeTabIndex]}
    </View>
  );

  const components = [tabBar, tabView];
  const screen = props.bottomTab ? components.reverse() : components;

  return <View>{props.hideTabBar ? tabView : screen}</View>;
};

export default TabRouter;
