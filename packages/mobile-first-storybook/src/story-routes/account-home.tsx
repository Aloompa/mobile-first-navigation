import * as React from 'react';
import { Container, Title } from './components';

export const AccountHome = () => (
  <Container backgroundColor={'#99d'}>
    <Title>Details</Title>
    <Detail>Email: email@address.de</Detail>
    <Detail>Password: ••••••</Detail>
  </Container>
);

const Detail = ({ children }) => (
  <div
    style={{
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      paddingBottom: 18
    }}
  >
    {children}
  </div>
);
