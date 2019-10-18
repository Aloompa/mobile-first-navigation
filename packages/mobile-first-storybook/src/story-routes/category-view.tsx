import * as React from 'react';
import { Container, SimpleButton, Title } from './components';

export const CategoryView = ({ route, setRoute }) => (
  <Container backgroundColor={route.params.backgroundColor}>
    <Title>{route.params.category}</Title>
    {route.params.items.map((item) => (
      <SimpleButton
        name={`Item #${item.split('-')[2]}`}
        onPress={() =>
          setRoute({
            route: 'ItemView',
            params: { item, backgroundColor: route.params.backgroundColor }
          })
        }
      />
    ))}
  </Container>
);
