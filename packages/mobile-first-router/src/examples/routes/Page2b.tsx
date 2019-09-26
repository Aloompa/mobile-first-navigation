import * as React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

const Page2b = (props) => (
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
        backgroundColor: '#272727',
        padding: 12
      }}
    >
      <Text
        style={{
          color: '#FFFFFF'
        }}
      >
        Page 2B
      </Text>
    </View>
    <View
      style={{
        height: '50px',
        width: '100%',
        backgroundColor: '#BBB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <TouchableOpacity onPress={props.nextPage}>
        <View>
          <Text>Page 3</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default (props) =>
  Page2b({
    ...props,
    nextPage: (e) => {
      e.preventDefault();
      props.setRoute({
        route: 'Page3',
        navigationTitle: 'Page 3A'
      });
    }
  });
