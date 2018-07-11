import * as React from 'react';

import { View } from 'react-native';

const Wrapper = props => (
    <View style={{
        flex: 1,
        position: 'fixed',
        height: '100vh',
        width: '100vw'
    }}>{props.children}</View>
);

export default Wrapper;