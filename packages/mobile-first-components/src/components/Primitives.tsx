import * as React from 'react';

export const Button = (props) => <button {...props}>{props.children}</button>;
export const View = (props) => <div {...props}>{props.children}</div>;
export const Text = (props) => <span {...props}>{props.children}</span>;
