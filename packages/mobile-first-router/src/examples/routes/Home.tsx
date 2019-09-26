import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Home = (props) => (
  <View
    style={{
      display: 'flex',
      flex: 1,
      height: '100%',
      flexDirection: 'column'
    }}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: '#444444',
        padding: 12
      }}
    >
      <Text
        style={{
          color: '#FFFFFF'
        }}
      >
        Home
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
      <TouchableOpacity onPress={props.nextPage}>
        <View>
          <Text>Page 2</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default (props) =>
  Home({
    ...props,
    nextPage: (e) => {
      e.preventDefault();
      props.setRoute({
        route: 'Page2',
        params: {}
      });
    }
  });
