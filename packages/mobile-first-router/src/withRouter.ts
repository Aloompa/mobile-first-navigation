import { compose, last, path } from 'ramda';
import {
  navigateBack,
  navigateBackComplete,
  navigateComplete,
  resetNavigation,
  setNavbarHidden,
  setRoute,
  setTitleCache,
  setActiveTab
} from './routerReducer';

import bindActionCreators from './util/bindActionCreators';
import { connect } from 'react-redux';

const historyPath = path(['router', 'history']);
const currentPath = compose(
  last,
  historyPath
);

export const mapStateToProps = (state, props) => {
  console.log(props, 'PROPS IN MAP STATE');
  return {
    ...props,
    history: historyPath(state),
    route: currentPath(state),
    isNavigatingBack: path(['router', 'isNavigatingBack'], state),
    isNavigating: path(['router', 'isNavigating'], state),
    poppedRoute: path(['router', 'poppedRoute'], state),
    routeToPop: path(['router', 'routeToPop'], state),
    titleCache: path(['router', 'titleCache'], state),
    navbarHidden: path(['router', 'navbarHidden'], state),
    activeTabIndex: path(['router', 'activeTab'], state),
    tabRoutes: path(['router', 'tabRoutes'], state),
    isModal: path(['router', 'isModal'], state),
    tabBarHorizontalPadding: path(['router', 'tabBarHorizontalPadding'])
  };
};

export const mapDispatchToProps = bindActionCreators({
  resetNavigation,
  navigateComplete,
  setRoute,
  navigateBack,
  navigateBackComplete,
  setTitleCache,
  setNavbarHidden,
  setActiveTab
});

const withRouter = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter;
