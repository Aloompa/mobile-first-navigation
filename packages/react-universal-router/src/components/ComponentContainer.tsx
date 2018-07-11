import * as React from 'react';

import { View } from 'react-native';

const ComponentContainer = props => (
    <View style={{
        ...props.style,
        width: '100vw'
    }} />
);

export default ComponentContainer;