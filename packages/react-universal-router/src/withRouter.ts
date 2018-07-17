import { compose, last, path } from 'ramda';
import { navigateBack, navigateBackComplete, resetNavigtion, setRoute, setTitleCache } from './routerReducer';

import bindActionCreators from './util/bindActionCreators';
import { connect } from 'react-redux';

const historyPath = path(['router', 'history']);
const currentPath = compose(last, historyPath);

export const mapStateToProps = state => ({
    history: historyPath(state),
    route: currentPath(state),
    isNavigatingBack: path(['router', 'isNavigatingBack'], state),
    titleCache: path(['router', 'titleCache'], state)
});

export const mapDispatchToProps =
    bindActionCreators({
        resetNavigtion,
        setRoute,
        navigateBack,
        navigateBackComplete,
        setTitleCache
    });

const withRouter = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default withRouter;