import * as React from 'react';

import { View } from 'react-native';

const Wrapper = props => (
    <View style={{
        flex: 1,
        position: 'fixed',
        height: '100%',
        width: '101%',
        left: '-1px',
        right: '-1px'
    }}>{props.children}</View>
);

export default Wrapper;