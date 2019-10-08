import * as React from 'react';

export const Title = ({ children }) => (
  <div
    style={{
      fontFamily: 'Inter-Bold',
      fontSize: 22,
      fontWeight: 700,
      paddingBottom: 18,
      paddingTop: 18
    }}
  >
    {children}
  </div>
);
