import { compose, last, path } from 'ramda';
import { navigateBack, navigateBackComplete, navigateComplete, resetNavigation, setNavbarHidden, setRoute, setTitleCache  } from './routerReducer';

import bindActionCreators from './util/bindActionCreators';
import { connect } from 'react-redux';

const historyPath = path(['router', 'history']);
const currentPath = compose(last, historyPath);

export const mapStateToProps = state => ({
    history: historyPath(state),
    route: currentPath(state),
    isNavigatingBack: path(['router', 'isNavigatingBack'], state),
    isNavigating: path(['router', 'isNavigating'], state),
    titleCache: path(['router', 'titleCache'], state),
    navbarHidden: path(['router', 'navbarHidden'], state)
});

export const mapDispatchToProps =
    bindActionCreators({
        resetNavigation,
        navigateComplete,
        setRoute,
        navigateBack,
        navigateBackComplete,
        setTitleCache,
        setNavbarHidden
    });

const withRouter = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default withRouter;