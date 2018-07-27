import * as React from 'react';

import { View } from 'react-native';

const ComponentContainer = props => (
    <View style={{
        ...props.style,
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: '100%'
    }}>{props.children}</View>
);

export default ComponentContainer;