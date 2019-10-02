import * as React from 'react';

import { Text, Button, View } from '@aloompa/mobile-first-components';
const { useState } = React;
const Page2b = (props) => {
  const [text, setText] = useState('test');
  return (
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

        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
            <Text>Page 3</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

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
