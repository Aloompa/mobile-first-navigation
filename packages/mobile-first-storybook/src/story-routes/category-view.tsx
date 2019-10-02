import * as React from 'react';
import { Container, SimpleButton, Title } from './components';

export const CategoryView = ({ route, setRoute }) => (
  <Container backgroundColor={route.params.backgroundColor}>
    <Title>{route.params.category}</Title>
    {route.params.items.map((item) => (
      <SimpleButton
        name={item}
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
