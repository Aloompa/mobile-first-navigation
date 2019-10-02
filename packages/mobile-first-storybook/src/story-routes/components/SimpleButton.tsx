import * as React from 'react';

export const SimpleButton = ({ name, onPress }) => (
  <div
    style={{
      backgroundColor: '#555',
      borderRadius: 4,
      color: '#eee',
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      marginBottom: 8,
      marginTop: 8,
      padding: 18,
      textAlign: 'center'
    }}
    onClick={onPress}
  >
    {name}
  </div>
);
