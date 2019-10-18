import * as React from 'react';
import { Container, Title } from './components';

export const ItemView = ({ route, setRoute }) => (
  <Container backgroundColor={route.params.backgroundColor}>
    <Title>{route.params.item.replace(/-/g, ' ')}</Title>
    <ViewDetails
      onPress={() =>
        setRoute({
          route: 'ItemDetails',
          navigationTitle: route.params.item,
          params: route.params
        })
      }
    />
  </Container>
);

const ViewDetails = ({ onPress }) => (
  <div
    style={{
      color: '#3333ff',
      fontFamily: 'Inter-Regular',
      fontSize: 12
    }}
    onClick={onPress}
  >
    View Details
  </div>
);
