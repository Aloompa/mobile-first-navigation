import * as React from 'react';

import { View } from 'react-native';

const ContentArea = props => (
    <View style={{
        flex: 1,
        position: 'relative'
    }}>{props.children}</View>
);

export default ContentArea;