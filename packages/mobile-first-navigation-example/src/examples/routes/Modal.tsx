import * as React from 'react';

import { Text, Button, View } from '@aloompa/mobile-first-components';

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
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute'
      }}
    >
      <Button
        style={{
          width: '100%',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={(e) => props.prevPage(e)}
      >
        <Text>Close</Text>
      </Button>
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
