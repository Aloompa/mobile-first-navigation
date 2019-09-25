import * as React from 'react';
import SvgIcon from './SVGImage';

const TabButton = (props: {
    iconUrl: string,
    iconUnselectedColor: string;
    iconSelectedColor: string;
    selected?: boolean;
    iconHeight: number;
    iconWidth: number;
    title: string;
}) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'absolute',
      alignItems: 'center',
      paddingTop: 8,
      width: '100%'
    }}>
    <SvgIcon 
        color={props.selected ? props.iconSelectedColor : props.iconUnselectedColor}
        height={props.iconHeight}
        width={props.iconWidth}
        url={props.iconUrl}
    />
    <span style={{
      position: 'absolute',
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      lineHeight: 5,
    }}>{props.title}</span>
    </div>
);

export default TabButton;