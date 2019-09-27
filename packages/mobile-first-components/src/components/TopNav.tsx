import * as React from 'react';

import { Text, Button, View } from './Primitives';

const TopNav = (props) =>
  !props.navbarHidden && (
    <View
      style={{
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        flex: 1
      }}
    >
      {props.history.length === 1 ? (
        <View
          style={{
            padding: 7,
            height: 10,
            position: 'absolute'
          }}
        />
      ) : (
        <View
          style={{
            textAlign: 'left',
            padding: 7,
            position: 'absolute'
          }}
        >
          <Button onClick={() => props.navigateBack()}>
            <Text
              style={{
                fontSize: 18
              }}
            >
              {props.mode === 'modal' ? 'X' : '<'}
            </Text>
          </Button>
        </View>
      )}
      <View
        style={{
          padding: 7,
          textAlign: 'center'
        }}
      >
        <Text>{props.routeTitle}</Text>
      </View>
    </View>
  );

export default TopNav;
