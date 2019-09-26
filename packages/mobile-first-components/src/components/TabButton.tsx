import * as React from 'react';
import SvgIcon from './SVGImage';
// import { TouchableOpacity } from 'react-native';
import { Button, View, Text } from '..';

const TabButton = (props: {
  iconUrl: string;
  iconUnselectedColor: string;
  iconSelectedColor: string;
  selected?: boolean;
  iconHeight: number;
  iconWidth: number;
  title: string;
  onPress: Function;
}) => (
  <Button onClick={() => props.onPress()} style={{ flex: 1 }}>
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 8,
        flex: 1,
        height: 52
      }}
    >
      <SvgIcon
        color={
          props.selected ? props.iconSelectedColor : props.iconUnselectedColor
        }
        height={props.iconHeight}
        width={props.iconWidth}
        url={props.iconUrl}
      />
      <Text
        style={{
          position: 'absolute',
          fontFamily: 'Inter-Regular',
          fontSize: 12,
          lineHeight: 5,
          flex: 1
        }}
      >
        {props.title}
      </Text>
    </View>
  </Button>
);

export default TabButton;
