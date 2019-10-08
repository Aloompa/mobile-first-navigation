import * as React from 'react';

export const Container = ({ backgroundColor, children }) => (
  <div
    style={{
      backgroundColor,
      paddingLeft: 18,
      paddingRight: 18,
      maxHeight: 'calc(100vh - 52px)',
      minHeight: 'calc(100vh - 102px)',
      overflowY: 'scroll'
    }}
  >
    {children}
  </div>
);
