import * as React from 'react';

import { View } from './Primitives';

const Wrapper = (props) => (
  <View
    style={{
      flex: 1,
      position: 'fixed',
      height: '100%',
      width: '101%',
      left: '-1px',
      right: '-1px',
      border: '2px solid red'
    }}
  >
    {props.children}
  </View>
);

export default Wrapper;
