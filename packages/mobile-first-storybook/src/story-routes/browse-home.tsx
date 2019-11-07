import * as React from 'react';
import { SimpleButton, Container, Title } from './components';

export const BrowseHome = ({ setRoute }) => (
  <Container backgroundColor={'#d99'}>
    <Title>Categories</Title>
    {['Land', 'Sea', 'Sky'].map((category, key) => (
      <SimpleButton
        name={category}
        key={key}
        onPress={() =>
          setRoute({
            route: 'CategoryView',
            params: {
              category,
              backgroundColor: '#f99',
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
