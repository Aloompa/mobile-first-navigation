import * as React from 'react';
import { Container, SimpleButton, Title } from './components';

const items = (() => {
  const itemIndexes = [0, 1, 2, 3, 4, 5];

  const getRandomItem = (category) => {
    const rngIndex = Math.floor(Math.random() * itemIndexes.length);
    const itemNumber = itemIndexes[rngIndex];
    itemIndexes.splice(rngIndex, 1);
    return `${category}-Item-${itemNumber}`;
  };

  return ['Land', 'Sea', 'Sky'].reduce(
    (acc, category) => ({
      ...acc,
      [category]: Array(Math.random() < 0.5 ? 1 : 2)
        .fill(0)
        .map(() => getRandomItem(category))
    }),
    {}
  );
})();

export const PurchasesHome = ({ setRoute }) => (
  <Container backgroundColor={'#7d7'}>
    <Title>Categories Purchased</Title>
    {Object.keys(items).map((category) => (
      <SimpleButton
        name={category}
        onPress={() =>
          setRoute({
            route: 'CategoryView',
            navigationTitle: 'Purchases',
            params: {
              category,
              backgroundColor: '#7f7',
              items: items[category]
            }
          })
        }
      />
    ))}
  </Container>
);
