import * as React from 'react';

import { Text, Button, View } from '@aloompa/mobile-first-components';

const Page3 = (props) => (
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
        backgroundColor: '#222',
        padding: 12
      }}
    >
      <Text
        style={{
          color: '#FFFFFF'
        }}
      >
        Page 3
      </Text>
    </View>
    <View
      style={{
        height: '50px',
        width: '100%',
        backgroundColor: '#AAA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Button
        style={{
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={(e) => props.nextPage(e)}
      >
        <View>
          <Text>Modal</Text>
        </View>
      </Button>
    </View>
  </View>
);

export default (props) =>
  Page3({
    ...props,
    nextPage: (e) => {
      e.preventDefault();
      props.setRoute({
        route: 'Modal'
      });
    }
  });
