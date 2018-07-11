import * as R from 'ramda';

import { bindActionCreators } from 'redux';

const curriedBindActionCreators = R.curry(bindActionCreators);

export default curriedBindActionCreators;