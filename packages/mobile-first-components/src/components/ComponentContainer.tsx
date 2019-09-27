import * as React from 'react';

import { View } from './Primitives';

const ComponentContainer = (props) => (
  <View
    style={{
      ...props.style,
      width: '100%',
      backgroundColor: '#FFFFFF',
      height: '100%',
      flex: 1
    }}
  >
    {props.children}
  </View>
);

export default ComponentContainer;
