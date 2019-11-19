import * as React from 'react';
import { Text, Button, View } from '@aloompa/mobile-first-components';

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
          <Text>Page 2</Text>
        </View>
      </Button>
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
