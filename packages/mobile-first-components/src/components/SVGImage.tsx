import * as React from 'react';
import { View } from '..';

const SvgIcon = (props: {
  color: string;
  height: number;
  width: number;
  url: string;
}) => (
  <View
    style={{
      height: props.height,
      width: props.width,
      backgroundColor: props.color,
      WebkitMaskImage: `url(${props.url})`
    }}
  />
);

export default SvgIcon;
