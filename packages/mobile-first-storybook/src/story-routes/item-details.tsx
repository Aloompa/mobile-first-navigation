import * as React from 'react';
import { Container, SimpleButton, Title } from './components';

export const ItemDetails = ({ navigateBack, route }) => (
  <Container backgroundColor={'#fff'}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 52px)'
      }}
    >
      <div>
        <Title>Item Details</Title>
        {route.params.item.split('-Item-').map((detail, index) => (
          <div
            key={index}
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 16,
              paddingBottom: 8
            }}
          >
            {index === 0 ? 'Category' : 'Item#'}: {detail}
          </div>
        ))}
      </div>
      <SimpleButton name={'Close'} onPress={navigateBack} />
    </div>
  </Container>
);
