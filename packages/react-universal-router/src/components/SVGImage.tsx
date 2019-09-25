import * as React from 'react';

const SvgIcon = (props: {
  color: string;
  height: number;
  width: number;
  url: string 
}) => (
  <div
    style={{
      height: props.height,
      width: props.width,
      backgroundColor: props.color,
      WebkitMaskImage: `url(${props.url})`
    }}
  />
);

export default SvgIcon;