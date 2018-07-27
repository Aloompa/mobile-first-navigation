import * as React from 'react';

import { View } from 'react-native';

const Wrapper = props => (
    <View style={{
        flex: 1,
        position: 'fixed',
        height: '100%',
        width: '100%'
    }}>{props.children}</View>
);

export default Wrapper;