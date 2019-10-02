import * as React from 'react';
import { View } from './Primitives';

const TabRouter = (props: {
  activeTabIndex: number;
  setActiveTab: any;
  bottomTab: boolean;
  tabButtons: any[];
  tabViews: any[];
  viewHeightReduction: number;
}) => {
  const tabBar = (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 52
      }}
    >
      {props.tabButtons.map((button, index) =>
        button(props.activeTabIndex === index, () => props.setActiveTab(index))
      )}
    </View>
  );

  const tabView = (
    <View style={{ height: `Calc(100vh - ${props.viewHeightReduction}px` }}>
      {props.tabViews[props.activeTabIndex]}
    </View>
  );

  const view = [tabBar, tabView];

  return <View>{props.bottomTab ? view.reverse() : view}</View>;
};

export default TabRouter;
