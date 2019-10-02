import * as React from 'react';
import { SimpleButton, Container, Title } from './components';

export const BrowseHome = ({ setRoute }) => (
  <Container backgroundColor={'#d77'}>
    <Title>Categories</Title>
    {['Land', 'Sea', 'Sky'].map((category) => (
      <SimpleButton
        name={category}
        onPress={() =>
          setRoute({
            route: 'CategoryView',
            params: {
              category,
              backgroundColor: '#f77',
              items: Array(6)
                .fill(0)
                .map((_, index) => `${category}-Item-${index}`)
            }
          })
        }
      />
    ))}
  </Container>
);
