import * as React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

const Modal = (props) => (
  <View
    style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      height: '100%'
    }}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        padding: 12
      }}
    >
      <Text
        style={{
          color: '#CCC'
        }}
      >
        Modal
      </Text>
    </View>
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: '#CCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <TouchableOpacity onPress={props.prevPage}>
        <View>
          <Text>Close</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default (props) =>
  Modal({
    ...props,
    prevPage: (e) => {
      e.preventDefault();
      props.navigateBack();
    }
  });
